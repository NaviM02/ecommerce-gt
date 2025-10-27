import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputForPasswordComponent } from '../../../../../commons/components/input-for-password/input-for-password.component';
import { InputWithIconComponent } from '../../../../../commons/components/input-with-icon/input-with-icon.component';
import { RequiredIndicatorComponent } from '../../../../../commons/components/required-indicator/required-indicator.component';
import { AuthService } from '../../../../../services/core/auth.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { LoginBannerComponent } from '../../components/login-banner/login-banner.component';
import { AuthRequestDto } from '../../../../../models/model';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    LoginBannerComponent,
    InputForPasswordComponent,
    InputWithIconComponent,
    RequiredIndicatorComponent,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  authReq: AuthRequestDto = new AuthRequestDto();

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  doLogin() {
    if (!this.isValid) {
      this.toastService.warning('Por favor completa todos los campos requeridos.');
      return;
    }

    this.authService.doLogin(this.authReq).subscribe({
      next: _ => {
        this.toastService.success('Inicio de sesión exitoso');
        void this.router.navigate(['dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.error == 'wrong_credentials') return this.toastService.error('Usuario o contraseña incorrectos');
        if (e.error.error == 'inactive_user') return this.toastService.error('Usuario inactivo');
        this.toastService.error('Error en el servidor, intenta más tarde');
      }
    });
  }

  get isValid(): boolean {
    return !!this.authReq.username
      && !!this.authReq.password
      && !!this.authReq.username.trim()
      && !!this.authReq.password.trim();
  }
}
