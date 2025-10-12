import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialIconComponent } from '../material-icon/material-icon.component';

/**
 * Component that displays a header for a form page, including a title, description, and an optional "Back" button.
 *
 * @Example
 * ```html
 * <div class="form-page-header-container">
 *   <app-form-page-header
 *     title="txt_create_user"
 *     description="txt_create_user_description"
 *     [backRoute]="['/security/users']"
 *   ></app-form-page-header>
 * </div>
 * ```
 */
@Component({
  selector: 'app-form-page-header',
  imports: [
    MaterialIconComponent,
    RouterLink
  ],
  templateUrl: './form-page-header.component.html',
  styleUrl: './form-page-header.component.scss'
})
export class FormPageHeaderComponent {

  // The title to display in the header.
  @Input() title: string = '';

  // An optional complement to the title, displayed in a lighter font next to the title.
  @Input() titleComplement: string = '';

  // The description to display below the title.
  @Input() description: string = '';

  // The route to navigate to when the "Back" button is clicked. If not provided, the button will be hidden.
  @Input() backRoute: any[] | string | null | undefined = undefined;
}
