import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialIconComponent } from '../material-icon/material-icon.component';

/**
 * Component that displays a header for a list page, including a title, description, and an optional "Save" button.
 *
 * @Example
 * ```html
 * <div class="list-page-header-container">
 *   <app-list-page-header
 *     title="txt_users"
 *     description="txt_users_description"
 *     [saveRoute]="['/security/users/add']"
 *     saveText="txt_create_user"
 *   ></app-list-page-header>
 * </div>
 * ```
 */
@Component({
  selector: 'app-list-page-header',
  imports: [
    MaterialIconComponent,
    RouterLink
  ],
  templateUrl: './list-page-header.component.html',
  styleUrl: './list-page-header.component.scss'
})
export class ListPageHeaderComponent {

  // The title to display in the header.
  @Input() title: string = '';
  // The description to display below the title.
  @Input() description: string = '';

  // The route to navigate to when the "Save" button is clicked. If not provided, the button will be hidden.
  @Input() saveRoute: any[] | string | null | undefined = undefined;

  // The text to display on the "Save" button.
  @Input() saveText: string = '';
}
