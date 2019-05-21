import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { SalaryComponent } from './salary/salary.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { DepartmentComponent } from './department/department.component';
import { PositionComponent } from './position/position.component';
import { NewDepartmentComponent } from './new-department/new-department.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { NewPositionComponent } from './new-position/new-position.component';
import { EditPositionComponent } from './edit-position/edit-position.component';
import { AccountComponent } from './account/account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'account/:id',
    component: EditAccountComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'employee/newemp',
    component: NewEmployeeComponent
  },
  {
    path: 'employee/:id',
    component: EditEmployeeComponent
  },
  {
    path: 'salary',
    component: SalaryComponent,
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'department',
    component: DepartmentComponent
  },
  {
    path: 'department/newdept',
    component: NewDepartmentComponent
  },
  {
    path: 'department/:id',
    component: EditDepartmentComponent
  },
  {
    path: 'position',
    component: PositionComponent
  },
  {
    path: 'position/newpos',
    component: NewPositionComponent
  },
  {
    path: 'position/:id',
    component: EditPositionComponent
  },
  {
    path: '**',
    redirectTo: 'account'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
