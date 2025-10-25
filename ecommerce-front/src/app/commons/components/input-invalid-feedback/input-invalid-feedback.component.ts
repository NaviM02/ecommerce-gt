import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-invalid-feedback',
  imports: [],
  templateUrl: './input-invalid-feedback.component.html',
  styleUrl: './input-invalid-feedback.component.scss'
})
export class InputInvalidFeedbackComponent {

  @Input() message: string = 'Campo obligatorio';
}
