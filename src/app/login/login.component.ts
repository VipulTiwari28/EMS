import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiDialogService,
  TuiLoaderModule,
  TuiNotificationModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoaderComponent } from '../core/components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiAlertModule,
    TuiDialogModule,
    TuiNotificationModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    LoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  load = false;
  invalidPassword: boolean = false;
  constructor(
    private auth: AuthService,
    private dialogs: TuiDialogService,
    private router: Router
  ) {}

  readonly loginForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', Validators.required),
  });

  /**
   * Function to authenticate user
   */
  onSubmit() {
    this.load = true;
    this.auth
      .login(
        this.loginForm.value.id!.toLowerCase(),
        this.loginForm.value.password!
      )
      .subscribe((data) => {
        if (data) {
          if (data.password === this.loginForm.value.password) {
            if (data.role == 'admin') {
              localStorage.setItem('token', JSON.stringify({ user: data }));
              this.router.navigate(['/admin']);
            } else {
              localStorage.setItem('token', JSON.stringify({ user: data }));
              this.router.navigate(['/user']);
            }
          } else {
            this.invalidPassword = true;
            this.load = false;
          }
        } else {
          this.load = false;
          this.retryDialog();
        }
      });
  }

  /**
   * Tui dialog component to show alert on invalid ID
   */
  retryDialog(): void {
    this.dialogs
      .open('ID does not exist!', {
        label: 'Oh no,',
        size: 's',
        data: { button: 'Retry' },
      })
      .subscribe((complete) => console.log('closed'));
  }
}
