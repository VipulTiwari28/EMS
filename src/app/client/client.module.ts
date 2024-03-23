import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { LeaveFormComponent } from './leave-form/leave-form.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TuiButtonModule, TuiLoaderModule, TuiNotificationModule, TuiSvgModule } from '@taiga-ui/core';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { LoaderComponent } from '../core/components/loader/loader.component';

@NgModule({
  declarations: [
    HomeComponent,
    LeaveFormComponent,
    LeaveListComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    TuiLoaderModule,
    TuiSvgModule,
    MatTableModule,
    TuiButtonModule,
    TuiNotificationModule,
    MatSortModule,
    LoaderComponent
  ]
})
export class ClientModule { }
