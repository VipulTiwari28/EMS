import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiInputDateModule,
  TuiInputModule,
  TuiRadioLabeledModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-holidayform',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiRadioLabeledModule,
    TuiErrorModule,
    TuiButtonModule,
    TuiGroupModule,
    TuiLoaderModule,
    TuiInputDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './holidayform.component.html',
  styleUrls: ['./holidayform.component.scss'],
})
export class HolidayformComponent implements OnChanges {
  @Input() observer: any;
  @Output() done: EventEmitter<any> = new EventEmitter();
  @Input() edit: any;
  @Input() Name: any;
  @Input() type: any;
  @Input() date: any;
  @Input() Index: any;
  load = false
  holidayForm: any;
  constructor(private fb: FormBuilder, private db: FirebaseService) {}

  ngOnChanges(changes: SimpleChanges): void {    
    if (this.edit){
      this.holidayForm = this.fb.group({
        name: [this.Name],
        type: [this.type],
        date: [this.date],
      });
    }else {
      this.holidayForm = this.fb.group({
        name: ['',Validators.required],
        type: ['',Validators.required],
        date: ['',Validators.required],
      });
    }

  }
  readonly types = ['National Holiday', 'Religious Holiday'];

  onSubmit() {
    this.load = true;       
    this.db
      .updateHoliday(this.holidayForm.value, this.Index)
      .subscribe((data) => {
        this.load = false;
        this.done.emit();
      });
  }

  onDelete() {
    this.load = true;
    this.db
    .deleteHoliday(this.Index)
    .subscribe((data) => {
      this.load = false;
      this.done.emit();
    });    
  }
}

