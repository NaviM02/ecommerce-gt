import { Component, OnInit } from '@angular/core';
import { LoginBannerComponent } from '../../components/login-banner/login-banner.component';
import {
  RequiredIndicatorComponent
} from '../../../../../commons/components/required-indicator/required-indicator.component';
import { InputWithIconComponent } from '../../../../../commons/components/input-with-icon/input-with-icon.component';
import { FormsModule } from '@angular/forms';
import {
  InputForPasswordComponent
} from '../../../../../commons/components/input-for-password/input-for-password.component';
import { Role, User } from '../../../../../models/model';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../../../services/other/toast.service';
import { UserService } from '../../../../../services/core/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-account-page',
  imports: [
    InputForPasswordComponent,
    InputWithIconComponent,
    LoginBannerComponent,
    RequiredIndicatorComponent,
    LoginBannerComponent,
    RequiredIndicatorComponent,
    InputWithIconComponent,
    FormsModule,
    InputForPasswordComponent,
    RouterLink
  ],
  templateUrl: './create-account-page.component.html',
  styleUrl: './create-account-page.component.scss'
})
export class CreateAccountPageComponent implements OnInit {

  user: User = new User();
  confirmPassword: string = '';
  role: Role = {roleId: 2, roleName: 'COMUN'};

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ){
  }

  ngOnInit(): void {

  }

  create(){
    if (!this.isValid) return this.toastService.warning('Llene todo el formulario');

    if (this.user.password !== this.confirmPassword) return this.toastService.warning('Las contraseñas no son iguales.');

    this.user.role = this.role;

    this.userService.save(this.user).subscribe({
      next: () => {
        this.toastService.success('Tus cambios se guardaron con exito');
        void this.router.navigate(['/c/login']);
      },
      error: (e: HttpErrorResponse) => {
        if (e.error == 'client_email_must_be_unique') return this.toastService.error('msg_client_email_already_exists');
        this.toastService.error('msg_error_server');
      }
    });
  }

  get isValid(): boolean {
    return !!this.user.fullName &&
      !!this.user.email &&
      !!this.user.password &&
      !!this.user.phone &&
      this.user.fullName.trim() !== '' &&
      this.user.email.trim() !== '' &&
      this.user.password.trim() !== '' &&
      this.user.phone.trim() !== '';
  }
}
