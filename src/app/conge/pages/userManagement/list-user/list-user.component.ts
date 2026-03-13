import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UTILISATEUR } from 'src/app/conge/models/userModel';
import { UserService } from 'src/app/conge/services/user.service';
import { LoginService } from 'src/app/layout/services/login.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  page = 1;
  pageSize = 12;
  collectionSize: any;
  private utilisateurR: any;
  users: UTILISATEUR[] = [];
  constructor(private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getAll();
  }
  get listUsers(): UTILISATEUR[] {
    return this.users
      .map((user: any, i: any) => ({ employeeid: i + 1, ...user }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  getAll() {
    this.userService.getAllUtilisateur().subscribe(
      (data: any) => {
        this.users = data;
        this.collectionSize = this.users.length
      }
    )
  }


}
