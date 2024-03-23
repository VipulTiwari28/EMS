import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageHolidaysRoutingModule } from './manage-holidays-routing.module';
import {
  TuiBreadcrumbsModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import {CdkDropList, CdkDrag} from '@angular/cdk/drag-drop';

import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiGroupModule,
  TuiSvgModule,
  TuiErrorModule,
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListHolidaysComponent } from './list-holidays/list-holidays.component';
import { HolidayformComponent } from './holidayform/holidayform.component';
import { LoaderComponent } from '../core/components/loader/loader.component';

@NgModule({
  declarations: [ListHolidaysComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManageHolidaysRoutingModule,
    TuiIslandModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    TuiSvgModule,
    TuiLoaderModule,
    TuiDataListModule,
    MatFormFieldModule,
    MatInputModule,
    TuiButtonModule,
    TuiGroupModule,
    HolidayformComponent,
    CdkDropList,
    CdkDrag,
    LoaderComponent
  ],
})
export class ManageHolidaysModule {}
