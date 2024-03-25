import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Attendance } from '../../interfaces/attendance';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userLeaves$ = new BehaviorSubject<any>([]);
 
  constructor(private http: HttpClient) {}
 
  // APIs for users,holidays and leaves
 
  dbUserUrl =
    'https://angular-miniproject-default-rtdb.firebaseio.com/users/.json';
  dbHolidayUrl =
    'https://angular-miniproject-default-rtdb.firebaseio.com/holidays/.json';
  dbLeavesUrl =
    'https://angular-miniproject-default-rtdb.firebaseio.com/leaves/.json';
   
    dbAttendanceUrl =
    'https://mini-project-default-default-rtdb.firebaseio.com/info/.json';
 
  addUser(user: User): Observable<any> {
    return this.http.put(
      `https://angular-miniproject-default-rtdb.firebaseio.com/users/${user.id}.json`,
      user
    );
  }
 
  // all methods for users
 
  getUsers(): Observable<any> {
    return this.http.get(this.dbUserUrl);
  }
 
  updateUser(user: any, id: any) {
    return this.http.patch(
      `https://angular-miniproject-default-rtdb.firebaseio.com/users/${id}.json`,
      user
    );
  }
 
  getUserById(id: string): Observable<any> {
    return this.http.get(
      `https://angular-miniproject-default-rtdb.firebaseio.com/users/${id}.json`
    );
  }
 
  deleteUserById(id: string) {
    return this.http.patch(
      `https://angular-miniproject-default-rtdb.firebaseio.com/users/${id}.json`,
      { deleted: true }
    );
  }
 
  // all holidays methods
 
  addHoliday(holiday: any, id: any) {
    return this.http.put(
      `https://angular-miniproject-default-rtdb.firebaseio.com/holidays/${id}.json`,
      holiday
    );
  }
 
  updateHoliday(holiday: any, id: any) {
    if (id) {
      return this.http.patch(
        `https://angular-miniproject-default-rtdb.firebaseio.com/holidays/${id}.json`,
        holiday
      );
    } else {
      return this.http.post(
        `https://angular-miniproject-default-rtdb.firebaseio.com/holidays/.json`,
        holiday
      );
    }
  }
 
  deleteHoliday(id: any): Observable<any> {
    return this.http.delete(
      `https://angular-miniproject-default-rtdb.firebaseio.com/holidays/${id}.json`
    );
  }
 
  getHolidays() {
    return this.http.get(this.dbHolidayUrl);
  }
 
  // All Leaves methods
 
  getLeaves(): Observable<any> {
    return this.http.get(this.dbLeavesUrl);
  }
 
  getLeavesById(id: string): Observable<any> {
    return this.http.get(
      `https://angular-miniproject-default-rtdb.firebaseio.com/leaves/${id}.json`
    );
  }
 
  deleteLeave(id: any, key: any) {
    return this.http.delete(
      `https://angular-miniproject-default-rtdb.firebaseio.com/leaves/${id}/${key}.json`
    );
  }
 
  updateSL(id: string, data: number) {
    return this.http.patch(
      `https://angular-miniproject-default-rtdb.firebaseio.com/users/${id}/leaves.json`,
      { sl: data }
    );
  }
 
  updateCL(id: string, data: number) {
    return this.http.patch(
      `https://angular-miniproject-default-rtdb.firebaseio.com/users/${id}/leaves.json`,
      { cl: data }
    );
  }
 
  requestLeave(leave: any): Observable<any> {
    return this.http.post(
      `https://angular-miniproject-default-rtdb.firebaseio.com/leaves/${leave.id}.json`,
      { status: 'pending', ...leave }
    );
  }
 
  updateLeave(data:any,leave: any): Observable<any> {    
    return this.http.patch(
      `https://angular-miniproject-default-rtdb.firebaseio.com/leaves/${data.id}/${data.key}.json`,
      { ...leave }
    );
  }
 
  acceptLeave(key: string, id: string): Observable<any> {
    return this.http.patch(
      `https://angular-miniproject-default-rtdb.firebaseio.com/leaves/${id}/${key}.json`,
      { status: 'approved' }
    );
  }
 
  rejectLeave(key: string, id: string): Observable<any> {
    return this.http.patch(
      `https://angular-miniproject-default-rtdb.firebaseio.com/leaves/${id}/${key}.json`,
      { status: 'rejected' }
    );
  }
 
   // Methods for attendance
 
   getAttendance(id:string): Observable<any> {
    return this.http.get(`https://mini-project-default-default-rtdb.firebaseio.com/info/${id}/.json`);
  }

  addAttendance(data: any): Observable<any> {
    return this.http.put(`https://mini-project-default-default-rtdb.firebaseio.com/info/${data.id}/.json`, data
      
    );
  }
    
 
  // updateAttendance(attendance: Attendance): Observable<Attendance> {
  //   return this.http.put<Attendance>(`${this.dbAttendanceUrl}/${attendance.id}.json`, attendance);
  // }
 
  // deleteAttendance(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.dbAttendanceUrl}/${id}.json`);
  // }
}
// import { Injectable } from '@angular/core';
// import { User } from '../../interfaces/user';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root',
// })
// export class FirebaseService {
//   userLeaves$ = new BehaviorSubject<any>([]);
 
//   constructor(private http: HttpClient) {}
 
//   // APIs for users,holidays and leaves
 
//   dbUserUrl =
//     'https://angular-miniproject-default-rtdb.firebaseio.com/users/.json';
//   dbHolidayUrl =
//     'https://angular-miniproject-default-rtdb.firebaseio.com/holidays/.json';
//   dbLeavesUrl =
//     'https://lms-project-9b0da-default-rtdb.asia-southeast1.firebasedatabase.app/leaves/.json';
   
//   addUser(user: User): Observable<any> {
//     return this.http.put(
//       `https://angular-miniproject-default-rtdb.firebaseio.com/users/${user.id}.json`,
//       user
//     );
//   }
 
//   // all methods for users
 
//   getUsers(): Observable<any> {
//     return this.http.get(this.dbUserUrl);
//   }
 
//   updateUser(user: any, id: any) {
//     return this.http.patch(
//       `https://angular-miniproject-default-rtdb.firebaseio.com/users/${id}.json`,
//       user
//     );
//   }
 
//   getUserById(id: string): Observable<any> {
//     return this.http.get(
//       `https://angular-miniproject-default-rtdb.firebaseio.com/users/${id}.json`
//     );
//   }
 
//   deleteUserById(id: string) {
//     return this.http.patch(
//       `https://angular-miniproject-default-rtdb.firebaseio.com/users/${id}.json`,
//       { deleted: true }
//     );
//   }
 
//   // all holidays methods
 
//   addHoliday(holiday: any, id: any) {
//     return this.http.put(
//       `https://angular-miniproject-default-rtdb.firebaseio.com/holidays/${id}.json`,
//       holiday
//     );
//   }
 
//   updateHoliday(holiday: any, id: any) {
//     if (id) {
//       return this.http.patch(
//         `https://angular-miniproject-default-rtdb.firebaseio.com/holidays/${id}.json`,
//         holiday
//       );
//     } else {
//       return this.http.post(
//         `https://angular-miniproject-default-rtdb.firebaseio.com/holidays/.json`,
//         holiday
//       );
//     }
//   }
 
//   deleteHoliday(id: any): Observable<any> {
//     return this.http.delete(
//       `https://angular-miniproject-default-rtdb.firebaseio.com/holidays/${id}.json`
//     );
//   }
 
//   getHolidays() {
//     return this.http.get(this.dbHolidayUrl);
//   }
 
//   // All Leaves methods
 
//   getLeaves(): Observable<any> {
//     return this.http.get(this.dbLeavesUrl);
//   }
 
//   getLeavesById(id: string): Observable<any> {
//     return this.http.get(
//       `https://lms-project-9b0da-default-rtdb.asia-southeast1.firebasedatabase.app/leaves/${id}.json`
//     );
//   }
 
//   deleteLeave(id: any, key: any) {
//     return this.http.delete(
//       `https://lms-project-9b0da-default-rtdb.asia-southeast1.firebasedatabase.app/leaves/${id}/${key}.json`
//     );
//   }
 
//   updateSL(id: string, data: number) {
//     return this.http.patch(
//       `https://lms-project-9b0da-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}/leaves.json`,
//       { sl: data }
//     );
//   }
 
//   updateCL(id: string, data: number) {
//     return this.http.patch(
//       `https://lms-project-9b0da-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}/leaves.json`,
//       { cl: data }
//     );
//   }
 
//   requestLeave(leave: any): Observable<any> {
//     return this.http.post(
//       `https://lms-project-9b0da-default-rtdb.asia-southeast1.firebasedatabase.app/leaves/${leave.id}.json`,
//       { status: 'pending', ...leave }
//     );
//   }
 
//   updateLeave(data:any,leave: any): Observable<any> {    
//     return this.http.patch(
//       `https://lms-project-9b0da-default-rtdb.asia-southeast1.firebasedatabase.app/leaves/${data.id}/${data.key}.json`,
//       { ...leave }
//     );
//   }
 
//   acceptLeave(key: string, id: string): Observable<any> {
//     return this.http.patch(
//       `https://lms-project-9b0da-default-rtdb.asia-southeast1.firebasedatabase.app/leaves/${id}/${key}.json`,
//       { status: 'approved' }
//     );
//   }
 
//   rejectLeave(key: string, id: string): Observable<any> {
//     return this.http.patch(
//       `https://lms-project-9b0da-default-rtdb.asia-southeast1.firebasedatabase.app/leaves/${id}/${key}.json`,
//       { status: 'rejected' }
//     );
//   }
// }
 