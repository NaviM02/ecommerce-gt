import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../models/model';
import { UserService } from '../../../../../services/core/user.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ConfirmActionService } from '../../../../../services/other/confirm-action.service';
import { confirmAction } from '../../../../../commons/decorators/confirm.decorator';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import { TableRowActionComponent } from '../../../../../commons/components/table-row-action/table-row-action.component';
import { RoleEnum } from '../../../../../models/role.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [
    ListPageHeaderComponent,
    TableRowActionComponent,
    ListPageHeaderComponent,
    TableRowActionComponent,
    FormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private confirmActionService: ConfirmActionService
  ) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.userService.findAll(undefined, RoleEnum.COMMON).subscribe({
      next: data => {
        this.users = data;
        this.filteredUsers = data;
      },
      error: () => this.toastService.error('Error del servidor')
    });
  }

  @confirmAction({
    title: 'Eliminar usuario',
    bodyQuestion: '¿Estas seguro de querer eliminar este usuario?',
    bodyText: 'Esta acción es irreversible.',
    confirmText: 'Eliminar'
  })
  delete(id: number) {
    this.userService.delete(id)
      .subscribe({
        next: _ => {
          this.findAll();
          this.toastService.success('Eliminado correctamente');
        },
        error: _ => this.toastService.error('Error en el servidor')
      });
  }
  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter(p =>
      p.fullName.toLowerCase().includes(term)
    );
  }

  getRoleStr(role: number){
    switch (role) {
      case RoleEnum.ADMINISTRATOR: return 'Administrador';
      case RoleEnum.MODERATOR: return 'Moderador';
      case RoleEnum.LOGISTICS: return 'Logistica';
      default: return '';
    }
  }
}
