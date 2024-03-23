import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiInputModule, TuiRadioLabeledModule } from '@taiga-ui/kit';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiDialogService,
  TuiErrorModule,
  TuiGroupModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { TuiDialog } from '@taiga-ui/cdk';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-userform',
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
    TuiDialogModule
  ],
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserformComponent {
  load = false;
  @Input() observer: any;
  @Input() Id: any;
  @Input() Name: any;
  @Input() email: any;
  @Input() position: any;
  @Input() edit!: boolean;
  @Output() done: EventEmitter<any> = new EventEmitter();
  constructor(
    private dialogs: TuiDialogService,
    private auth: AuthService,
    private fb: FormBuilder, private db: FirebaseService) {}
  readonly roles = ['Admin', 'Employee'];
  userForm: any;

  ngOnChanges(changes: SimpleChanges) {
    if (this.edit) {
      this.userForm = this.fb.group({
        id: [''],
        name: [this.Name],
        email: [this.email],
        password: [''],
        position: [this.position],
        role: ['Employee'],
      });
    } else {
      this.userForm = this.fb.group({
        id: ['',{
          updateOn:"blur", 
          validators:[Validators.required],
          asyncValidators:[this.auth.useridValidator()]
        }],
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        position: ['', [Validators.required]],
        role: ['Employee'],
      });
    }
  }

  /**
   * Tui dialog component for alert existing user
   */
  userExistDialog(): void {
    this.dialogs
      .open('ID already exist!', {
        label: 'Oh no,',
        size: 's',
        data: { button: 'Retry' },
      })
      .subscribe((complete) => console.log('closed'));
  }

  /**
   * Function to add new/existing User
   */
  onSubmit() {
    this.load = true;
    if (this.edit) {
      this.db
        .updateUser(
          {
            name: this.userForm.value.name!,
            email: this.userForm.value.email!,
            position: this.userForm.value.position!,
            role: this.userForm.value.role!,
          },
          this.Id
        )
        .subscribe((data) => {
          this.done.emit('edit');
          this.load = false;
          this.observer.complete();
        });
    } else {
      this.db
        .getUserById(this.userForm.value.id.toLowerCase())
        .subscribe((user) => {
          if(user){
            this.load = false;
            this.userExistDialog()
          }else {
            this.db
            .addUser({
              id: this.userForm.value.id!.toLowerCase(),
              name: this.userForm.value.name!,
              email: this.userForm.value.email!,
              password: this.userForm.value.password!,
              position: this.userForm.value.position!,
              role: this.userForm.value.role!,
            })
            .subscribe((data) => {
              this.done.emit('add');
              this.load = false;
              this.observer.complete();
            });
          }
        });
      
    }
  }
}
