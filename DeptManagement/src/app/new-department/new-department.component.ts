import { Component, OnInit } from '@angular/core';
import { Department } from '../shared/service/department';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from '../shared/service/department.service';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css']
})
export class NewDepartmentComponent implements OnInit {


  form: FormGroup;
  submitted = false;
  dept: Department;

  constructor(private deptService: DepartmentService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      deptName: ['',Validators.required],  //deptName giống với formControlName bên html
      deptManagerId: ['',Validators.required]
    })
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  save(){
    this.deptService.add(this.form.value).subscribe(()=> {
      console.log(this.form.value);
      alert("Đã thêm phòng ban thành công")
      this.form.reset();
    },
    error => {
      console.log(this.form.value);
      alert(`Đã có lỗi xảy ra: ${error}`);
      //console.log('Đã có lỗi xảy ra: ', error);
    })
  }

  onSubmit() {
    this.submitted=true;

     // stop here if form is invalid
     if (this.form.invalid) {
      return;
    }

    this.save();
  }

}
