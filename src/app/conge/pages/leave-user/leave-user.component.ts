import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { UTILISATEUR } from '../../models/userModel';
import { CONGE } from '../../models/congeModel';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-leave-user',
  templateUrl: './leave-user.component.html',
  styleUrls: ['./leave-user.component.css']
})
export class LeaveUserComponent implements OnInit{
  page = 1;
  pageSize = 6;
  collectionSize: any;
  private congeR: any;
  conges: CONGE[] = [];
  constructor(private congeService: LeaveService,private localStorage:LocalService) { }

  ngOnInit() {
    // this.getAll();    
    this.getAllCongeByUser(this.localStorage.getData("id"));
  }
  get listConge(): CONGE[] {
    return this.conges
      .map((conge: any, i: any) => ({ id: i + 1, ...conge }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  // getAll() {
  //   this.congeService.getAllConge().subscribe(
  //     (data: any) => {
  //       this.conges = data;
  //       this.collectionSize = this.conges.length
  //     }
  //   )
  // }
  getAllCongeByUser(idUser:any) {
    this.congeService.getAllCongeByIdUser(idUser).subscribe(
      (data: any) => {
        this.conges = data;
        this.collectionSize = this.conges.length
      }
    )
  }


}
