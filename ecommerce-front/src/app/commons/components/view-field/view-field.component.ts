import { Component, Input } from '@angular/core';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';

/**
 * Component to display a field in view mode
 *
 * @Example
 * ```html
 * <app-view-field
 *    class="col-12 col-lg-6 mb-3"
 *    [labelText]="'Field Label'"
 *    [textValue]="user.name"
 * </app-view-field>
 * ```
 */
@Component({
  selector: 'app-view-field',
  imports: [
    ToggleSwitchComponent
  ],
  templateUrl: './view-field.component.html',
  styleUrl: './view-field.component.scss'
})
export class ViewFieldComponent {

  // Label text to display
  @Input() labelText!: string;

  // Value to display as text
  @Input() textValue!: string | undefined;

  // Value to display as boolean switch
  @Input() switchValue!: boolean | undefined;

}
