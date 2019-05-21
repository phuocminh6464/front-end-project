import { Component, OnInit } from '@angular/core';
import { Account } from '../shared/service/account';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../shared/service/acount.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  account: Account;
  editForm: FormGroup;
  user = localStorage.getItem("editAcc");

  constructor(private formBuilder: FormBuilder,private router: Router,private accService: AccountService) { }

  ngOnInit() {
    if(!this.user) {
      alert("Invalid action")
      this.router.navigate(['employee']);
      return;
    }
    this.editForm = this.formBuilder.group({
      userName: ['',Validators.required],
      pass: ['',Validators.required]
    });
    this.accService.getAccByUser(this.user)
      .subscribe( data => {
        console.log(data)
        this.editForm.setValue({userName: data.userName,pass: data.pass});
    });
  }

  onSubmit() {
    this.accService.update(this.user,this.editForm.value)
        .pipe(first()) //Emit the first value or first to pass provided expression.
        //.subscribe();
        .subscribe(() => {
            console.log(this.editForm.value)
            this.router.navigate(['account']);
          },
          error => {
            console.log(this.editForm.value)
            console.log(error)
            //alert(`Đã có lỗi xảy ra: ${error}`);
          });
  }

}
