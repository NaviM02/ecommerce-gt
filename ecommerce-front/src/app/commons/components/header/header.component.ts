import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { MaterialIconComponent } from '../material-icon/material-icon.component';
import { AuthService } from '../../../services/core/auth.service';
import { Router } from '@angular/router';
import { RoleEnum } from '../../../models/role.enum';

@Component({
  selector: 'app-header',
  imports: [
    MaterialIconComponent,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownToggle,
    NgbDropdown,
    NgbDropdown
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  fullName: string = '';
  userRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const username = this.authService.getUsername();
    const role = this.authService.getUserRole();

    this.fullName = username ?? 'Desconocido';
    this.userRole = this.roleToString(role);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    console.log('Cerrando sesión...');
    this.authService.clearToken();
  }

  goToProfile() {
    console.log('Ir a perfil');
  }

  private roleToString(role: number | null): string {
    switch (role) {
      case RoleEnum.ADMINISTRATOR: return 'Administrador';
      case RoleEnum.COMMON: return 'Común';
      case RoleEnum.MODERATOR: return 'Moderador';
      case RoleEnum.LOGISTICS: return 'Logística';
      default: return 'Sin rol';
    }
  }
}
