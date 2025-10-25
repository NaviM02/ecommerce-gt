import { Component, OnInit } from '@angular/core';
import { concatMap, iif, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../../../services/core/user.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, User } from '../../../../../models/model';
import { confirmAction } from '../../../../../commons/decorators/confirm.decorator';

import {
  DetailPageHeaderComponent
} from '../../../../../commons/components/detail-page-header/detail-page-header.component';
import { ViewFieldComponent } from '../../../../../commons/components/view-field/view-field.component';

@Component({
  selector: 'app-user-detail',
  imports: [
    DetailPageHeaderComponent,
    DetailPageHeaderComponent,
    ViewFieldComponent
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  id!: number | null;
  user: User = new User();
  userStatus: boolean = true;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ){
  }

  ngOnInit() {
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

  @confirmAction({
    title: 'txt_delete_user',
    bodyQuestion: 'txt_confirm_really_want_delete_user',
    bodyText: 'txt_irreversible_action',
    confirmText: 'txt_understand_delete'
  })
  onDelete() {
    if (!this.id) return;
    this.userService.delete(this.id)
      .subscribe({
        next: _ => {
          this.toastService.success('msg_success_delete');
          void this.router.navigate(['admin', 'users']);
        },
        error: _ => this.toastService.error('msg_error_server')
      });
  }
}
