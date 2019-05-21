import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'; //HttpClientModule thay thế cho HttpMiodule
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPaginationModule} from 'ngx-pagination'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { EmployeeComponent } from './employee/employee.component';
import { SalaryComponent } from './salary/salary.component';
import { OutlineComponent } from './outline/outline.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { DepartmentComponent } from './department/department.component';
import { PositionComponent } from './position/position.component';
import { NewDepartmentComponent } from './new-department/new-department.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { EditPositionComponent } from './edit-position/edit-position.component';
import { NewPositionComponent } from './new-position/new-position.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeService, CustomInterceptor } from './shared/service/employee.service';
import { Configuration } from './app.constants';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentService } from './shared/service/department.service';
import { PositionService } from './shared/service/position.service';
import { SalaryService } from './shared/service/salary.service';
import { AccountService } from './shared/service/acount.service';
import { AccountComponent } from './account/account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LogInComponent,
    SignInComponent,
    EmployeeComponent,
    SalaryComponent,
    OutlineComponent,
    NewEmployeeComponent,
    DepartmentComponent,
    PositionComponent,
    NewDepartmentComponent,
    EditEmployeeComponent,
    EditDepartmentComponent,
    EditPositionComponent,
    NewPositionComponent,
    AccountComponent,
    EditAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    EmployeeService,
    CustomInterceptor,
    Configuration,
    DepartmentService,
    PositionService,
    SalaryService,
    AccountService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
