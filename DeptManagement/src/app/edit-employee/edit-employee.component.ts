import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/service/employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeeService } from '../shared/service/employee.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {


  public minDate: Date = new Date ("01/01/1900");
  public maxDate: Date = new Date ("01/01/2100");
  public value: Date = new Date ();

  employee: Employee;
  editForm: FormGroup;
  empId = localStorage.getItem("editEmpId");

  constructor(private formBuilder: FormBuilder,private router: Router,private empService: EmployeeService) {
    }

  ngOnInit() {

    if(!this.empId) {
      alert("Invalid action")
      this.router.navigate(['employee']);
      return;
    }
    this.editForm = this.formBuilder.group({
      empId: ['',Validators.required],
      empName: ['',Validators.required],
      dateOfBirth: [this.value,Validators.required],
      sex: ['',Validators.required],
      address: ['',Validators.required],
      phone: ['',Validators.required]
    });
    this.empService.getEmployeeByID(+this.empId) // (+) converts string 'empId' to a number
      .subscribe( data => {
        console.log(data)
        this.editForm.setValue({empId: data.empId,empName: data.empName, dateOfBirth: data.dateOfBirth, sex: data.sex, address: data.address, phone: data.phone});
      });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    this.empService.update(+this.empId,this.editForm.value)
        .pipe(first()) //Emit the first value or first to pass provided expression.
        .subscribe(() => {
            console.log(this.editForm.value)
            this.router.navigate(['employee']);
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
