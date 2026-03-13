import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CONGE } from 'src/app/conge/models/congeModel';
import { LeaveService } from 'src/app/conge/services/leave.service';

@Component({
  selector: 'app-list-leave',
  templateUrl: './list-leave.component.html',
  styleUrls: ['./list-leave.component.css']
})
export class ListLeaveComponent {
  page = 1;
  pageSize = 6;
  collectionSize: any;
  private congeR: any;
  conges: CONGE[] = [];
  constructor(private congeService: LeaveService) { }

  ngOnInit() {
    this.getAll();
  }
  get listConge(): CONGE[] {
    return this.conges
      .map((conge: any, i: any) => ({ id: i + 1, ...conge }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  getAll() {
    this.congeService.getAllConge().subscribe(
      (data: any) => {
        this.conges = data;
        this.collectionSize = this.conges.length
      }
    )
  }
  changeResponse(congeId:any,response:any) {
    this.congeService.changeResponse(congeId,response).subscribe(
      (data=>{
        this.getAll();
      })
    )
  }

}
