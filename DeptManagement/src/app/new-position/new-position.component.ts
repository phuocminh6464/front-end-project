import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PositionService } from '../shared/service/position.service';

@Component({
  selector: 'app-new-position',
  templateUrl: './new-position.component.html',
  styleUrls: ['./new-position.component.css']
})
export class NewPositionComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  position: Position;

  constructor(private posService: PositionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      empId: ['',Validators.required],  //empName giống với formControlName bên html
      //empName: ['',Validators.required],
      deptId: ['',Validators.required],
      position: ['',Validators.required]
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
    this.posService.add(this.form.value).subscribe(()=> {
      console.log(this.form.value);
      alert("Đã thêm chức vụ cho nhân viên thành công")
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
