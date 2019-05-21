import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Account } from '../shared/service/account';
import { AccountService } from '../shared/service/acount.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {



  constructor() { }

  ngOnInit() {

  }

}
