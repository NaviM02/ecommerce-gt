import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../models/model';
import { UserService } from '../../../../../services/core/user.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ConfirmActionService } from '../../../../../services/other/confirm-action.service';
import { confirmAction } from '../../../../../commons/decorators/confirm.decorator';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import { TableRowActionComponent } from '../../../../../commons/components/table-row-action/table-row-action.component';
import { RoleEnum } from '../../../../../models/role.enum';

@Component({
  selector: 'app-user-list',
  imports: [
    ListPageHeaderComponent,
    TableRowActionComponent,
    ListPageHeaderComponent,
    TableRowActionComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

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
      },
      error: () => this.toastService.error('Error del servidor')
    });
  }

  @confirmAction({
    title: 'txt_delete_user',
    bodyQuestion: 'txt_confirm_really_want_delete_user',
    bodyText: 'txt_irreversible_action',
    confirmText: 'txt_understand_delete'
  })
  delete(id: number) {
    this.userService.delete(id)
      .subscribe({
        next: _ => {
          this.findAll();
          this.toastService.success('msg_success_delete');
        },
        error: _ => this.toastService.error('msg_error_server')
      });
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
