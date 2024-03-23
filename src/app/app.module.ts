import {
  TuiRootModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiLinkModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TuiAppBarModule, TuiSidebarModule } from '@taiga-ui/addon-mobile';
import {
  TuiAccordionModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiActiveZoneModule, TuiItemModule } from '@taiga-ui/cdk';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RegisterComponent } from './register/register.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { PayrollComponent } from './payroll/payroll.component';
import { ManageAttendanceComponent } from './manage-attendance/manage-attendance.component';
import { ManagePayrollComponent } from './manage-payroll/manage-payroll.component';

@NgModule({
  declarations: [AppComponent, SidenavComponent, AttendanceComponent, PayrollComponent, ManageAttendanceComponent, ManagePayrollComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiSvgModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiDropdownModule,
    TuiLinkModule,
    TuiButtonModule,
    TuiItemModule,
    TuiAppBarModule,
    TuiAlertModule,
    TuiDialogModule,
    TuiNotificationModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    TuiAccordionModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    MatTooltipModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
