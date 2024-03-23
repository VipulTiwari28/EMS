import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  sidenav = true;
  name: string ='';
  isAdmin:any;
  private breakpointObserver = inject(BreakpointObserver);
  constructor(private dialogs: TuiDialogService,
    private auth: AuthService,private router: Router){
    this.name = this.auth.getUser().name
    this.isAdmin = this.auth.isAdmin()  
  }

   /**
   * Tui dialog component function
   * @param content 
   */
   showDialog(content: any): void {
    this.dialogs.open(content).subscribe();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout() {
      localStorage.removeItem('token');
      this.auth.isAuthenticated();
      this.router.navigate(['/login']);
    }
}
