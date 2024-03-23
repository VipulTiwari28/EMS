import { EventEmitter, Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Observable, map, of } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private db: FirebaseService, private router: Router) {}

  /**
   * Function to login existing user
   * @param id 
   * @param password 
   * @returns 
   */
  login(id: string, password: string): Observable<any> {
    return this.db.getUserById(id);
  }

  useridValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.db.getUserById(control.value).pipe(
        map(res => {          
          // if res is true, username exists, return true
          return res ? { useridExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  }


  /**
   * Function to get loggedin user details
   * @returns object
   */
  getUser(){
    let user = localStorage.getItem('token')!;
    return JSON.parse(user).user; 
  }

  /**
   * Function to check wheather user is admin or not
   * @returns boolean
   */
  isAdmin() {
    let tokenExist = localStorage.getItem('token')!;
    if (JSON.parse(tokenExist).user.role == 'admin') {
      return true
    } else {
      return false
    }
  }

  /**
   * Function to check user is authenticated
   * @returns boolean
   */
  isAuthenticated(){
    let tokenExist = localStorage.getItem('token')!;
    if (tokenExist) {
      return true;
    } else {
      return false;
    }
  }

}
