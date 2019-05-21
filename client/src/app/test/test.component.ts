import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../service/employee';
import { first } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
birth;

  employees: Employee[];
  emp:Employee;


  constructor(private empService: EmployeeService) {
    this.emp=new Employee();
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void{
    this.empService.getAllEmployees().subscribe(emps => {
      this.employees = emps;
      console.log(this.employees);
    });
  }

  deleteEmp(id: number){
    if(confirm('Bạn có chắc muốn xóa nhân viên có mã là ' + id + ' ?') == true){
      this.empService.delete(id).subscribe(result => {
        this.getAll();
      }, error => console.log('Đã có lỗi xảy ra: ', error));
    }

  }

  editEmp(id: number){

    this.empService.getEmployeeByID(+id) // (+) converts string 'empId' to a number
      .subscribe(data =>{
        this.emp=data;
        console.log(this.emp);
      });

      this.empService.update(this.emp.EmpId, this.emp)
      .pipe(first()) //Emit the first value or first to pass provided expression.
      .subscribe(() => {
          this.getAll();
        })
  }

  addEmp():void{
    this.empService.add(this.emp).subscribe(()=> {
      console.log(this.emp);
      this.getAll();
      this.emp=new Employee();
    })
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  refresh() {

  }


}
