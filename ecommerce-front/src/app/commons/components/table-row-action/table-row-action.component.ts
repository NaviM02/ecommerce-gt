import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { MaterialIconComponent } from '../material-icon/material-icon.component';

/**
 * Reusable component for table row actions (view, edit, delete)
 *
 * * @Example
 * ```html
 * <td class="text-end">
 *  <app-table-row-action
 *    [viewRoute]="['/view', entity.hashId]"
 *    [editRoute]="['/edit', entity.hashId]"
 *    (deleteAction)="onDelete(entity.hashId)"
 *  ></app-table-row-action>
 * </td>
 * ```
 *
 */
@Component({
  selector: 'app-table-row-action',
  imports: [
    MaterialIconComponent,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownToggle,
    RouterLink
  ],
  templateUrl: './table-row-action.component.html',
  styleUrl: './table-row-action.component.scss'
})
export class TableRowActionComponent {

  @Input() viewRoute: any[] | string | null | undefined;
  @Input() editRoute: any[] | string | null | undefined
  @Output() deleteAction = new EventEmitter<void>();

  get show(): boolean {
    return this.viewRoute !== undefined
      || this.editRoute !== undefined
      || this.deleteAction.observed;
  }
}
