import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';

const routes: Routes = [
  { path: '', component: ListEmployeesComponent },
  { path: 'employees', component: ListEmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageEmployeesRoutingModule {}
