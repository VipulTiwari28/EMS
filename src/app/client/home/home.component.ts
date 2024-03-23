import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';


const slideInOut = trigger(
  'slideInOut',[
    state('in',style({
      height:'100%'
    })),
    transition('void => *',[style({height:0}),animate('.3s ease-in')]),
    transition('* => void',[animate('.3s ease-out'),style({height:0})]),
  ]
)
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInOut]
})

export class HomeComponent {
  load = false;
  leaves:any[] = [];
  cl:any;
  sl:any;
  id:any;
  showPending = true;
  showHistory = true;
constructor(private auth: AuthService,private db: FirebaseService,private dialogs: TuiDialogService){
  this.id = this.auth.getUser().id;
  this.loadLeaves();
  this.db.getUserById(this.id).subscribe(user=>{this.cl = user.leaves.cl;this.sl = user.leaves.sl;this.load = false;});
}

/**
 * Function to load user leaves
 */
loadLeaves() {  
  this.load = true;
  this.db.getLeavesById(this.id).subscribe((data) => {
    let arr = Object.keys(data).map((key) => {
      return {
        key: key,
        ...data[key],
      };
    });    
    this.leaves = arr;
    this.load = false;    
  });
}

  /**
   * Tui dialog component function
   * @param content 
   */
  showDialog(content: any): void {
    this.dialogs.open(content).subscribe();
  }


update(type:any){
//   if (type == 'cl')
//   {this.cl = this.cl - 1;
//   this.db.updateCL(this.id,this.cl).subscribe(res=>console.log(res));
//   }
// else {this.sl = this.sl -1 ;
//   this.db.updateSL(this.id,this.cl).subscribe(res=>console.log(res));
// }
}
}
