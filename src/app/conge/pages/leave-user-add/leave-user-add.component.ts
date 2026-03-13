import { Component, OnInit } from '@angular/core';
import { UTILISATEUR } from '../../models/userModel';
import { LeaveService } from '../../services/leave.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-leave-user-add',
  templateUrl: './leave-user-add.component.html',
  styleUrls: ['./leave-user-add.component.css']
})
export class LeaveUserAddComponent implements OnInit{
  public employeeid: any;
  private idConge: any;
  public title = "Ajouter un Conge"
  public bodyData = {
    date_debut: '', date_fin: '',
    cause: '', response: '', employeeId: 0, typeCongeId: ''
  }

  userId: any;
  userName: any;
  constructor(private congeService: LeaveService, private userService: UserService, private _route: Router,
    private activateRoute: ActivatedRoute,private localStorage:LocalService) { }
  // getAllUser() {
  //   this.userService.getAllUtilisateur().subscribe(
  //     (data: any) => {
  //       this.users = data;
  //     }
  //   )
  // }
  getAllUserById() {
    this.userService.getUtilisateurById(this.localStorage.getData('id')).subscribe(
      (data: any) => {
        this.userId = data.employeeid;
        this.userName = data.employeename;
      }
    )
  }
  ngOnInit() {
    // this.getAllUser();
    this.getAllUserById();
    this.idConge = this.activateRoute.snapshot.params['id'];
    if (this.idConge) {
      this.title = "Modifier un Congé"
      // this.userService.getUserById(this.idUser).subscribe((data: any) => {
      //   this.userData.email = data.email;
      //   this.userData.nom = data.nom;
      //   this.userData.password = data.password;
      //   this.userData.prenom = data.prenom;
      //   this.userData.tel = data.tel;
      //   this.userData.username = data.username;
      //   this.userData.role = data.role;
      // })
    } else
      this.title = "Ajouter un Congé"
  }
  addConge() {
    this.bodyData.employeeId = Number(this.userId);
    this.congeService.addConge(this.bodyData).subscribe((data: any) => {
      this._route.navigateByUrl('dash/congeuser')

    })
  }
}
