import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/core/user.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, User } from '../../../../../models/model';
import { concatMap, iif, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormPageHeaderComponent } from '../../../../../commons/components/form-page-header/form-page-header.component';
import { FormsModule } from '@angular/forms';
import {
  InputInvalidFeedbackComponent
} from '../../../../../commons/components/input-invalid-feedback/input-invalid-feedback.component';
import {
  RequiredIndicatorComponent
} from '../../../../../commons/components/required-indicator/required-indicator.component';
import { ToggleSwitchComponent } from '../../../../../commons/components/toggle-switch/toggle-switch.component';
import { FormActionsComponent } from '../../../../../commons/components/form-actions/form-actions.component';
import { confirmAction } from '../../../../../commons/decorators/confirm.decorator';
import { NgClass } from '@angular/common';
import {
  InputForPasswordComponent
} from '../../../../../commons/components/input-for-password/input-for-password.component';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-user-form',
  imports: [
    FormPageHeaderComponent,
    FormsModule,
    InputInvalidFeedbackComponent,
    RequiredIndicatorComponent,
    ToggleSwitchComponent,
    FormActionsComponent,
    RequiredIndicatorComponent,
    ToggleSwitchComponent,
    FormsModule,
    InputInvalidFeedbackComponent,
    NgClass,
    FormActionsComponent,
    FormsModule,
    InputForPasswordComponent,
    InputForPasswordComponent,
    InputInvalidFeedbackComponent,
    NgOptionComponent,
    NgSelectComponent
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  id!: number | null;
  user: User = new User();
  userStatus: boolean = true;
  selectedRole: Role | null = null;

  roles: Role[] = [
    {roleId: 1, roleName: 'ADMIN'},
    {roleId: 2, roleName: 'COMUN'},
    {roleId: 3, roleName: 'MODERADOR'},
    {roleId: 4, roleName: 'LOGISTICA'},
  ];

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ){
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(params => this.id = Number(params.get('id'))),
        concatMap(_ =>
          iif(
            () => !!this.id,
            this.userService.findById(this.id!).pipe(
              tap(user => {
                this.user = user;
                this.userStatus = user.active;
                this.selectedRole = this.roles.find(_ => _.roleId == this.user.role.roleId) ?? null;
              })
            ),
            of(false)
          )
        )
      )
      .subscribe({
        error: (e: HttpErrorResponse) => {
          if (e.status === 404) {
            this.toastService.error('El recurso al que intentas acceder no existe o fue eliminado.');
            void this.router.navigate(['admin', 'users']);
            return;
          }
          this.toastService.error('Ocurrió un error en el servidor, porfavor intenta más tarde.');
        }
      });
  }

  onSave() {
    if (!this.isValid) return this.toastService.warning('msg_error_required_fields');

    this.user.active = this.userStatus;
    this.user.role = this.selectedRole ?? new Role();

    this.userService.save(this.user).subscribe({
      next: _ => {
        this.toastService.success('Tus cambios se guardaron con éxito');
        void this.router.navigate(['admin', 'users']);
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
        this.toastService.error('Ocurrió un error en el servidor, porfavor intenta más tarde.');
      }
    });
  }

  @confirmAction({
    title: 'Eliminar usuario',
    bodyQuestion: '¿Realmente deseas eliminar este usuario?',
    bodyText: 'Esta acción es irreversible.',
    confirmText: 'Entiendo, eliminar'
  })
  onDelete() {
    if (!this.id) return;
    this.userService.delete(this.id)
      .subscribe({
        next: _ => {
          this.toastService.success('Tus cambios se guardaron con éxito.');
          void this.router.navigate(['admin', 'users']);
        },
        error: _ => this.toastService.error('Ocurrió un error en el servidor. Intenta de nuevo más tarde.')
      });
  }

  get isValid(): boolean {
    return !!this.user.fullName?.trim()
      && !!this.user.username?.trim()
      && !!this.user.email?.trim();
  }
}
