import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from '../shared/service/department';
import { DepartmentService } from '../shared/service/department.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {

  department: Department;
  editForm: FormGroup;
  deptID = localStorage.getItem("editDeptId");

  constructor(private formBuilder: FormBuilder,private router: Router,private deptService: DepartmentService) {

  }

  ngOnInit() {

    if(!this.deptID) {
      alert("Invalid action.")
      this.router.navigate(['department']);
      return;
    }

    this.editForm = this.formBuilder.group({
      deptId: ['',Validators.required],
      deptName: ['',Validators.required],
      deptManagerId: ['',Validators.required]
    });

    this.deptService.getDepartmentById(+this.deptID) // (+) converts string 'empId' to a number
      .subscribe( data => {
        console.log(data)
        this.editForm.setValue({deptId: data.deptId,deptName: data.deptName, deptManagerId: data.deptManagerId});
      });
  }

  onSubmit() {

     // stop here if form is invalid
     if (this.editForm.invalid) {
      return;
    }
    
    this.deptService.update(+this.deptID,this.editForm.value)
        .pipe(first()) //Emit the first value or first to pass provided expression.
        .subscribe(() => {
            console.log(this.editForm.value)
            this.router.navigate(['department']);
          },
          error => {
            console.log(this.editForm.value)
            console.log(error)
            //alert(`Đã có lỗi xảy ra: ${error}`);
          });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }
}
