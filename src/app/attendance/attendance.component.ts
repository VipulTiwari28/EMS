import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  id: string = "";
  userAttendance: any;

  constructor(private db: FirebaseService) { }

  ngOnInit(): void { }

  getAttendance() {
    if (this.id) {
      this.db.getAttendance(this.id).subscribe((attendance) => {
        this.userAttendance = attendance.Attendance;
        console.log(this.userAttendance);
      });
    } else {
      // Handle case when ID is not provided
      console.log("Please provide a valid user ID.");
    }
  }
}
