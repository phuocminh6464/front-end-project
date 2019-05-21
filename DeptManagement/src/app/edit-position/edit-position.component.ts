import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PositionService } from '../shared/service/position.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit {


  editForm: FormGroup;

  posId = localStorage.getItem("editPosId");
  posEmpID=this.posId.slice(0,1);
  posDeptID=this.posId.slice(1,2);

  position:any;

  constructor(private formBuilder: FormBuilder,private router: Router,private posService: PositionService) {

  }

  ngOnInit() {
    if(!this.posDeptID || !this.posEmpID) {
      alert("Invalid action.")
      this.router.navigate(['position']);
      return;
    }


    this.editForm = this.formBuilder.group({
      empId: ['',Validators.required],
      deptId: ['',Validators.required],
      position: ['',Validators.required]
    });

    this.posService.getPosition(+this.posEmpID,+this.posDeptID) // (+) converts string 'empId' to a number
      .subscribe( data =>{
          console.log(data),
          this.editForm.setValue({empId: data.empId, deptId: data.deptId, position: data.position})
      });
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    this.posService.update(+this.posEmpID,+this.posDeptID,this.editForm.value)
        .pipe(first()) //Emit the first value or first to pass provided expression.
        .subscribe(() => {
            console.log(this.editForm.value)
            this.router.navigate(['position']);
          },
          error => {
            console.log(this.editForm.value)
            //console.log(error)
            alert(`Đã có lỗi xảy ra: ${error}`);
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
