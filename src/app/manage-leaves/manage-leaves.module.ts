import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLeavesRoutingModule } from './manage-leaves-routing.module';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLinkModule, TuiSvgModule, TuiLoaderModule} from '@taiga-ui/core';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from '../core/components/loader/loader.component';


@NgModule({
  declarations: [
    LeaveListComponent
  ],
  imports: [
    CommonModule,
    ManageLeavesRoutingModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    TuiSvgModule,
    TuiButtonModule,
    MatButtonModule,
    TuiLoaderModule,
    LoaderComponent
  ]
})
export class ManageLeavesModule { }
