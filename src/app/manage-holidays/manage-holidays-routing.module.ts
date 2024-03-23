import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListHolidaysComponent } from './list-holidays/list-holidays.component';

const routes: Routes = [{path:'', component: ListHolidaysComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageHolidaysRoutingModule { }
