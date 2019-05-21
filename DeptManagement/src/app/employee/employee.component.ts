import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/service/employee.service';
import { Employee } from '../shared/service/employee';
import { Router } from '@angular/router';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  constructor(private empService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void{
    this.empService.getAllEmployees().subscribe(emps => this.employees = emps);
    // you need to add subscribe, or else nothing will happen

  }

  deleteEmp(id: number){
    if(confirm('Bạn có chắc muốn xóa nhân viên có mã là ' + id + ' ?') == true){
      this.empService.delete(id).subscribe(result => {
        console.log(result);
        this.getAll();
      }, error => console.log('Đã có lỗi xảy ra: ', error));
    }
  }

  editEmp(id: number):void{
    console.log(id);
    localStorage.removeItem("editEmpId");
    localStorage.setItem("editEmpId", id.toString());
    this.router.navigate(['/employee/',id]);
  }
}
