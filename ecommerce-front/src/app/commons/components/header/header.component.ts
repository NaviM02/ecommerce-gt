import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { MaterialIconComponent } from '../material-icon/material-icon.component';

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
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  userName: string = 'Juan Gabriel';
  userRole: string = 'Administrador';

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token');
  }

  goToProfile() {
    console.log('Ir a perfil');
  }
}
