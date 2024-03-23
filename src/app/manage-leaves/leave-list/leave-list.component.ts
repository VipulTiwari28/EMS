import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss'],
})
export class LeaveListComponent {
  load = false;
  leave: any;
  arr: any[] = [];
  name: any;
  email: any;
  position: any;
  constructor(
    private fb: FirebaseService,
    private readonly dialogs: TuiDialogService
  ) {
    this.getLeaves();
  }

  getLeaves() {
    this.arr = [];
    this.load = true;
    this.fb.getLeaves().subscribe((leaves) => {
      Object.values(leaves).map((eachUser: any) => {
        Object.entries(eachUser).forEach(([uid, val]) => {
          this.arr.push({
            key: uid,
            val,
          });
        });
      });
      this.arr = this.arr.filter((data) => data.val.status == 'pending');
      this.load = false;
    });
  }

  /**
   * Function to find range between dates
   * @param from
   * @param to
   * @returns
   */
  range(from: any, to: any) {
    if (to) {
      return (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 3600 * 24) + 1;
    } else return 1;
  }

  showDialog(content: any, id: string): void {
    this.fb.getUserById(id).subscribe((data) => {
      this.name = data.name;
      this.email = data.email;
      this.position = data.position;
      this.dialogs.open(content).subscribe();
    });
  }

  accept(key: any, id: any) {
    this.load = true;
    this.fb.acceptLeave(key, id).subscribe((res) => this.getLeaves());
  }

  reject(key: any, id: any) {
    this.load = true;
    this.fb.rejectLeave(key, id).subscribe((res) => this.getLeaves());
  }
}
