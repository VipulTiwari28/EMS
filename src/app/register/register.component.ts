import { CommonModule } from '@angular/common';
import { Component,Input,EventEmitter,Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray,NgForm } from '@angular/forms';
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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,TuiButtonModule, TuiDialogModule, TuiLoaderModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationSuccessful: boolean = false;
  load = false;
  @Input() observer: any;
  @Input() Id: any;
  @Input() Name: any;
  @Input() email: any;
  @Input() position: any;
  @Input() edit!: boolean;
  @Output() done: EventEmitter<any> = new EventEmitter();
  registerForm: FormGroup;
  registrationApiUrl = 'https://angular-miniproject-default-rtdb.firebaseio.com/users/.json'; // Replace with your actual API endpoint

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient, // Inject HttpClient for API calls
    private router: Router,
    private dialogs: TuiDialogService,
    private fb: FormBuilder, private db: FirebaseService // Inject Router for navigation
  ) {
    this.registerForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)], { updateOn: 'blur' }],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
     
    });
    
  }
  
  userExistDialog(): void {
    this.dialogs
      .open('ID already exist!', {
        label: 'Oh no,',
        size: 's',
        data: { button: 'Retry' },
      })
      .subscribe((complete) => console.log('closed'));
  }
  onSubmit(registerForm: NgForm) {
    this.load = true;
    
    if (this.edit) {
      this.db
        .updateUser(
          {
            name: this.registerForm.value.name!,
            email: this.registerForm.value.email!,
            position: this.registerForm.value.position!,
            role: this.registerForm.value.role!,
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
        .getUserById(this.registerForm.value.id.toLowerCase())
        .subscribe((user) => {
          if(user){
            this.load = false;
            //alert("This user exits");
            this.userExistDialog()
          }else {
            this.db
            .addUser({
              id: this.registerForm.value.id!.toLowerCase(),
              name: this.registerForm.value.name!,
              email: this.registerForm.value.email!,
              password: this.registerForm.value.password!,
              position: "trainee",
              role: "Employee",
              
            })
            .subscribe((data) => {
              console.log("Hello");
              this.done.emit('add');
              this.load = false;
              this.registrationSuccessful = true;
              this.observer.complete();
            });
          }
        }); 
    }
    if (this.registrationSuccessful) {
      this.registerForm.reset(); // Clear the form
      this.router.navigate(['/login']); // Navigate to login page
    }
  }
  

  

  // onSubmit() {
  //   console.log('onSubmit');
  //   console.log(this.registerForm.value);

    
  //     const formData = this.registerForm.value;

  //     this.http.post(this.registrationApiUrl, formData)
  //       .subscribe(
  //         (response) => {
  //           console.log('Registration successful!', response);
  //           this.registerForm.reset(); // Reset form after successful registration
  //           this.router.navigate(['/login']); // Navigate to login page
  //         },
  //         (error) => {
  //           console.error('Registration error:', error);
  //           // Handle registration errors (e.g., display error message to user)
  //           alert('Invalid login data')
  //         }
  //       );
  // }
}

//
// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray, } from '@angular/forms';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
  
// })
// export class RegisterComponent {

//   registerForm: FormGroup;
//   addresses: FormArray;

//   constructor(private formBuilder: FormBuilder) {
//     this.registerForm = this.formBuilder.group({
//       username: ['',
//         {
//           validators: [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
//           updateOn: 'blur'
//         }],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]],
//       addresses: this.formBuilder.array([])
//     },
//       // { updateOn: 'submit' }
//     );
//     this.addresses = this.registerForm.get('addresses') as FormArray;
//   }

//   addAddress() {
//     const addressFormGroup = this.formBuilder.group({
//       city: ['', Validators.required],
//       pin: ['', Validators.required]
//     });
//     this.addresses.push(addressFormGroup);
//   }

//   removeAddress(index: number) {
//     this.addresses.removeAt(index);
//   }

//   onSubmit() {
//     console.log('onSubmit');
//     console.log(this.registerForm.value);
//     if (this.registerForm.valid) {
//       console.log(this.registerForm.value);
      
//       this.registerForm.reset();
//     }
//   }
// }



