import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/service/employee.service';
import { Employee } from '../shared/service/employee';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  public minDate: Date = new Date ("01/01/1900");
  public maxDate: Date = new Date ("01/01/2100");
  public value: Date = new Date ();

  form: FormGroup;
  submitted = false;
  emp: Employee;

  constructor(private empService: EmployeeService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      empName: ['',Validators.required],  //empName giống với formControlName bên html
      dateOfBirth: [this.value,Validators.required],
      sex: ['',Validators.required],
      address: ['',Validators.required],
      phone: ['',Validators.required],
      dept: ['',Validators.required],
      position: ['',Validators.required],
      //new FormControl(this.value,Validators.required),
    })
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }


  save(){
    this.empService.add(this.form.value).subscribe(()=> {
      console.log(this.form.value);
      alert("Đã thêm nhân viên thành công")
      this.form.reset();

    },
    error => {
      console.log(this.form.value);
      alert(`Đã có lỗi xảy ra: ${error}`);
      //console.log('Đã có lỗi xảy ra: ', error);
    })
  }


  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted=true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.save();
  }
}
