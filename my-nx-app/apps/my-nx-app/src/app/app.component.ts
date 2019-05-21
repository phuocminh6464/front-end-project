import { Employee } from './../../../backend/src/app/app.entity';

import { Component } from "@angular/core";
import { EmployeeService } from './employee.service';
import { first } from 'rxjs/operators';

// interface Todo  {  title: string; }

@Component({
  selector: "my-nx-app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  employees: Employee[];
  emp:Employee;
  searchKey: string;


  constructor(private empService: EmployeeService) {
    this.emp=new Employee(); //phải có để tạo obj bên html
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
      this.empService.delete(id).subscribe(() => {
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



}
