import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // For API calls
import { Router } from '@angular/router'; // For navigation
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiDialogService,
  TuiErrorModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
@Component({
  selector: 'app-manage-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TuiButtonModule, TuiDialogModule, TuiLoaderModule],
  templateUrl: './manage-info.component.html',
  styleUrls: ['./manage-info.component.scss']
})
export class ManageInfoComponent {
  @Input() id: any;
  @Input() attendance: any;
  @Input() payroll: any;
  attendanceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private db: FirebaseService,
    public route : Router,

  ) {
    this.attendanceForm = this.fb.group({
      id: ['', [Validators.required]],
      attendance: ['', [Validators.required]],
      payroll: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.attendanceForm = this.fb.group({
      id: ['', Validators.required],
      attendance: ['', Validators.required],
      payroll: ['', Validators.required]
    });
  }

  addAttendance() {
    if (this.attendanceForm.valid) {
      this.db.addAttendance({
        id : this.attendanceForm.value.id!.toLowerCase(),
        Attendance : this.attendanceForm.value.attendance!,
        Payroll : this.attendanceForm.value.payroll!,
      })
      .subscribe((data)=>{
        console.log(data);
        alert("Attendance and Payroll Added");
        this.route.navigateByUrl("/admin");

      })

    }
  }
}
