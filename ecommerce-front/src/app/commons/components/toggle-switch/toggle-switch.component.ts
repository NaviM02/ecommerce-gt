import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * A toggle switch component that allows users to switch between two states (on/off).
 * It supports labels for both states and can be disabled.
 *
 * @Example
 * ```html
 * Usage:
 * <app-toggle-switch
 *   [(model)]="isChecked"
 *   checkedLabel="txt_active"
 *   uncheckedLabel="txt_inactive"
 * </app-toggle-switch>
 * ```
 *
 * @Example
 * ```html
 * <app-toggle-switch
 *   [disabled]="true"
 *   [checked]="entity.status.internalId === TypologyEnum.Active"
 * ></app-toggle-switch>
 * ```
 */
@Component({
  selector: 'app-toggle-switch',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent {

  // Whether the toggle switch is disabled.
  @Input() disabled = false;

  // The checked state of the toggle switch.
  @Input() set checked(value: boolean) {
    this.model = value;
  }

  // The label to display when the switch is in the "checked" state.
  @Input() checkedLabel = 'Activo';
  // The label to display when the switch is in the "unchecked" state.
  @Input() uncheckedLabel = 'Inactivo'
  // The current value of the toggle switch (true for checked, false for unchecked).
  @Input() model: boolean | undefined;
  @Output() modelChange: EventEmitter<boolean | undefined> = new EventEmitter();

  onInputChange(checked: boolean) {
    this.modelChange.emit(checked);
  }
}
