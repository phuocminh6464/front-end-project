import { Component, OnInit } from '@angular/core';
import { Salary } from '../shared/service/salary';
import { SalaryService } from '../shared/service/salary.service';


@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  salaries: Salary[];

  constructor(private salService: SalaryService) {
  }

  ngOnInit() {
    this.getAll();
  }

  //this.empService.add(newEmp).subscribe(emp => this.emps.push(hero));

  getAll(): void{
    this.salService.getAllSalaries().subscribe(sal => this.salaries = sal);
    // you need to add subscribe, or else nothing will happen
  }

}
