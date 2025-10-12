import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NgClass } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-with-icon',
  imports: [NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputWithIconComponent),
      multi: true,
    }
  ],
  templateUrl: './input-with-icon.component.html',
  styleUrl: './input-with-icon.component.scss'
})
export class InputWithIconComponent implements ControlValueAccessor{

  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() inputType: 'text' | 'number' | 'password' = 'text';
  @Input() ngModel: string | undefined;
  @Output() ngModelChange: EventEmitter<string | undefined> = new EventEmitter();

  value: string = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  onInputChange(event: any) {
    this.ngModelChange.emit(event.target.value);
  }

}
