import { Component, OnInit } from '@angular/core';
import { PositionService } from '../shared/service/position.service';
import { Position } from '../shared/service/position';
import { Router } from '@angular/router';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  positions: Position[];
  new:Position[];

  constructor(private posService: PositionService,  private router: Router) {
  }

  ngOnInit() {
    this.getAll();
  }

  //this.empService.add(newEmp).subscribe(emp => this.emps.push(hero));

  getAll(): void{
    this.posService.getAllPositions().subscribe(pos => this.positions = pos);

    // you need to add subscribe, or else nothing will happen
  }

  deletePos(empID: number, deptID: number){
    if(confirm('Bạn có chắc muốn xóa chức vụ của người này không?') == true){
      this.posService.delete(empID, deptID).subscribe(result => {
        console.log(result);
        this.getAll();
      }, error => console.log('Đã có lỗi xảy ra: ', error));
    }
  }

  editPos(empID: number, deptID: number):void{
    console.log(empID.toString()+deptID.toString());
    localStorage.removeItem("editPosId");
    localStorage.setItem("editPosId", empID.toString()+deptID.toString());
    this.router.navigate(['/position/',empID + '&'+ deptID]);
  }
}
