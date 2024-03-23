import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TUI_ARROW } from '@taiga-ui/kit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LMS';
  isAuthenticated$: any;
  open = false;
  links = [
    { name: 'Employees', href: '/admin' },
    { name: 'Holidays', href: '/holidays' },
    { name: 'Leaves', href: '/leaves' },
  ];
  elem: any;
  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isAuthenticated()) this.isLoggedIn = true;
  }
  isLoggedIn = false;

  redirect(link: string) {
    this.toggle(false);
    this.router.navigate([`/${link}`]);
  }

  toggle(open: any): void {
    this.open = open;
  }

  logout() {
    localStorage.removeItem('token');
    this.auth.isAuthenticated();
    this.router.navigate(['/login']);
  }
}
