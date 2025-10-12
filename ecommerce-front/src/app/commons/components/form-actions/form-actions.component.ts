import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Component that provides form action buttons such as "Save" and "Cancel".
 *
 * @Example
 * ```html
 * <div class="form-actions-container">
 *  <app-form-actions
 *     cancelRoute="/home"
 *     cancelText="txt_cancel"
 *     saveText="txt_create"
 *     (saveAction)="onSave()"
 *  ></app-form-actions>
 * </div>
 * ```
 */
@Component({
  selector: 'app-form-actions',
  imports: [
    RouterLink
  ],
  templateUrl: './form-actions.component.html',
  styleUrl: './form-actions.component.scss'
})
export class FormActionsComponent {

  // The route to navigate to when the "Cancel" button is clicked. Defaults to '../'.
  @Input() cancelRoute: any[] | string | null | undefined = '../';

  // The text to display on the "Cancel" button. Defaults to 'txt_cancel'.
  @Input() cancelText: string = 'Cancelar';

  // The text to display on the "Save" button. Defaults to 'txt_create'.
  @Input() saveText: string = 'Crear'

  // Event emitted when the "Save" button is clicked. If not provided, the button will be hidden.
  @Output() saveAction = new EventEmitter<void>();

  // Whether to show the "Delete" button. Defaults to false.
  @Input() showDelete: boolean = false;

  // The text to display on the "Delete" button. Defaults to 'txt_delete'.
  @Input() deleteText: string = 'Eliminar';

  // Event emitted when the "Delete" button is clicked. If not provided, the button will be hidden.
  @Output() deleteAction = new EventEmitter<void>();
}
