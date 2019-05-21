import { Component, OnInit } from '@angular/core';
import { Department } from '../shared/service/department';
import { DepartmentService } from '../shared/service/department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: Department[];

  constructor(private deptService: DepartmentService, private router: Router) {
  }

  ngOnInit() {
    this.getAll();
  }

  //this.empService.add(newEmp).subscribe(emp => this.emps.push(hero));

  getAll(): void{
    this.deptService.getAllDepartments().subscribe(depts => this.departments = depts);
    // you need to add subscribe, or else nothing will happen
  }

  deleteDept(id: number){
    if(confirm('Bạn có chắc muốn xóa phòng ban có mã là ' + id + ' ?') == true){
      this.deptService.delete(id).subscribe(result => {
        console.log(result);
        this.getAll();
      }, error => console.log('Đã có lỗi xảy ra: ', error));
    }
  }

  editDept(id: number):void{
    console.log(id);
    localStorage.removeItem("editDeptId");
    localStorage.setItem("editDeptId", id.toString());
    this.router.navigate(['/department/',id]);
  }
}
