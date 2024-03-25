import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  id: string = "";
  payroll: any;

  constructor(private db: FirebaseService) { }

  ngOnInit(): void { }

  getPayRoll() {
    if (this.id) {
      this.db.getAttendance(this.id).subscribe((payroll) => {
        this.payroll = payroll.Payroll;
        console.log(this.payroll);
      });
    } else {
      // Handle case when ID is not provided
      console.log("Please provide a valid user ID.");
    }
  }
}
