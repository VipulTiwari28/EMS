import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageEmployeesRoutingModule } from './manage-employees-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TuiBreadcrumbsModule, TuiInputModule } from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiItemModule } from '@taiga-ui/cdk';
import { UserformComponent } from './userform/userform.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { LoaderComponent } from '../core/components/loader/loader.component';

@NgModule({
  declarations: [ListEmployeesComponent],
  imports: [
    CommonModule,
    ManageEmployeesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TuiButtonModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    TuiItemModule,
    TuiSvgModule,
    TuiDialogModule,
    TuiLoaderModule,
    UserformComponent,
    TuiInputModule,
    LoaderComponent
  ],
})
export class ManageEmployeesModule {}
