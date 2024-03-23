import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { isAdminGuard } from './core/guards/is-admin.guard';
import { isClientGuard } from './core/guards/is-client.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'Register',
    loadComponent: () =>
      import('./register/register.component').then((e) => e.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((e) => e.LoginComponent),
  },
  {
    path: '',
    component: SidenavComponent,
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: 'admin',
        canActivate: [isAdminGuard],
        loadChildren: () =>
          import('./manage-employees/manage-employees.module').then(
            (e) => e.ManageEmployeesModule
          ),
      },
      {
        path: 'user',
        canActivate: [isClientGuard],
        loadChildren: () =>
          import('./client/client.module').then((e) => e.ClientModule),
      },
      {
        path: 'holidays',
        canActivate: [isAdminGuard],
        loadChildren: () =>
          import('./manage-holidays/manage-holidays.module').then(
            (e) => e.ManageHolidaysModule
          ),
      },
      {
        path: 'leaves',
        canActivate: [isAdminGuard],
        loadChildren: () =>
          import('./manage-leaves/manage-leaves.module').then(
            (e) => e.ManageLeavesModule
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pagenotfound/pagenotfound.component').then(
            (e) => e.PagenotfoundComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
