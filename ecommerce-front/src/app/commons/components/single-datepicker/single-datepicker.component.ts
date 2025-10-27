import { NgClass } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbInputDatepicker
} from '@ng-bootstrap/ng-bootstrap';
import { InputInvalidFeedbackComponent } from '../input-invalid-feedback/input-invalid-feedback.component';
import { MaterialIconComponent } from '../material-icon/material-icon.component';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (!value) return null;

    const date = value.split(this.DELIMITER);
    return {
      day: parseInt(date[0], 10),
      month: parseInt(date[1], 10),
      year: parseInt(date[2], 10),
    };
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

/**
 * Single datepicker component using ng-bootstrap.
 * The model is in ISO format (`yyyy-MM-dd` or `yyyy-MM-ddTHH:mm:ss.sssZ`).
 * It emits an empty string if the date is not valid.
 *
 * @Example
 * ```html
 * <div class="col-12 col-lg-6 mb-3">
 *  <label class="form-label required-field">{{ t('Date') }}</label>
 *  <app-single-datepicker [(model)]="isoStringDate"></app-single-datepicker>
 * </div>
 * ```
 */
@Component({
  selector: 'app-single-datepicker',
  imports: [
    FormsModule,
    NgbInputDatepicker,
    MaterialIconComponent,
    NgClass,
    InputInvalidFeedbackComponent
  ],
  templateUrl: './single-datepicker.component.html',
  styleUrl: './single-datepicker.component.scss',
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class SingleDatepickerComponent {
  _model!: NgbDateStruct;

  // to disable the input
  @Input() disabled: boolean = false;

  // message for invalid date, default is 'txt_invalid_date', if not present it will not be shown
  @Input() txtInvalidFeedback: string = 'Fecha no inválida';

  // model in ISO format
  @Output() modelChange = new EventEmitter<string>();

  // model in ISO format (`yyyy-MM-dd` or `yyyy-MM-ddTHH:mm:ss.sssZ`)
  @Input() set model(value: string) {
    if (!value) return;
    const date = new Date(value);
    if (isNaN(date.getTime())) return;

    this._model = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

  constructor(private calendar: NgbCalendar) {
  }

  onModelChange(event: NgbDateStruct) {
    const ngbDate = NgbDate.from(this._model);
    if (!this.calendar.isValid(ngbDate)) {
      this.modelChange.emit('');// emit empty string if the date is not valid
      return;
    }

    const tmpDate = new Date();
    tmpDate.setFullYear(this._model.year, this._model.month - 1, this._model.day);
    tmpDate.setHours(0, 0, 0, 0);// set to midnight in local time
    this.modelChange.emit(tmpDate.toISOString());// emit in ISO format
  }
}
