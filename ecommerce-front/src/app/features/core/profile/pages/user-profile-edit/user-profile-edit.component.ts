import { Component, OnInit } from '@angular/core';
import { FormActionsComponent } from '../../../../../commons/components/form-actions/form-actions.component';
import { FormPageHeaderComponent } from '../../../../../commons/components/form-page-header/form-page-header.component';
import { FormsModule } from '@angular/forms';
import {
    InputInvalidFeedbackComponent
} from '../../../../../commons/components/input-invalid-feedback/input-invalid-feedback.component';
import {
    RequiredIndicatorComponent
} from '../../../../../commons/components/required-indicator/required-indicator.component';
import { User } from '../../../../../models/model';
import { UserService } from '../../../../../services/core/user.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-profile-edit',
  imports: [
    FormActionsComponent,
    FormPageHeaderComponent,
    FormsModule,
    InputInvalidFeedbackComponent,
    RequiredIndicatorComponent,
    NgClass
  ],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.scss'
})
export class UserProfileEditComponent implements OnInit {
  user: User = new User();
  userStatus: boolean = true;

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
        concatMap(_ =>
          this.userService.findMe().pipe(
            tap(user => {
              this.user = user;
              this.userStatus = user.active;
            })
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
    if (!this.isValid) return this.toastService.warning('Llene todo el formulario');

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

  get isValid(): boolean {
    return !!this.user.fullName?.trim()
      && !!this.user.username?.trim()
      && !!this.user.email?.trim();
  }
}
