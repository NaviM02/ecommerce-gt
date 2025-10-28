import { Component, OnInit } from '@angular/core';
import {
    DetailPageHeaderComponent
} from '../../../../../commons/components/detail-page-header/detail-page-header.component';
import { ViewFieldComponent } from '../../../../../commons/components/view-field/view-field.component';
import { User } from '../../../../../models/model';
import { UserService } from '../../../../../services/core/user.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, iif, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { confirmAction } from '../../../../../commons/decorators/confirm.decorator';

@Component({
  selector: 'app-user-profile',
    imports: [
        DetailPageHeaderComponent,
        ViewFieldComponent
    ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
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
            void this.router.navigate(['dashboard']);
            return;
          }
          this.toastService.error('Ocurrió un error en el servidor, porfavor intenta más tarde.');
        }
      });
  }
}
