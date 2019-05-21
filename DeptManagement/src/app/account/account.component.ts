import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/service/acount.service';
import { first } from 'rxjs/operators';
import { Account } from '../shared/service/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: Account[];

  constructor(private accService: AccountService, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.accService.getAll().pipe(first()).subscribe(accs => this.accounts = accs);
  }

  deleteAcc(user: string){
    if(confirm('Bạn có chắc muốn xóa tài khoản có tên là ' + user + ' ?') == true){
      this.accService.delete(user).subscribe(result => {
        console.log(result);
        this.getAll();
      }, error => console.log('Đã có lỗi xảy ra: ', error));
    }
  }

  editAcc(user: string):void{
    console.log(user);
    localStorage.removeItem("editAcc");
    localStorage.setItem("editAcc", user.toString());
    this.router.navigate(['/account/',user]);
  }
}
