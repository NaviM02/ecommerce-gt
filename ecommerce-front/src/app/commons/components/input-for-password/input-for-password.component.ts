import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-for-password',
  templateUrl: './input-for-password.component.html',
  styleUrls: ['./input-for-password.component.scss'],
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputForPasswordComponent),
      multi: true
    }
  ]
})
export class InputForPasswordComponent implements ControlValueAccessor {

  @Input() placeholder: string = '';
  @Input() icon: string = 'lock';
  @Input() iconPosition: 'left' | 'right' = 'left';
  inputType: 'text' | 'password' = 'password';

  value: string = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  // ControlValueAccessor
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
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  toggleInputType() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
    this.icon = this.inputType === 'password' ? 'lock' : 'lock_open';
  }
}
