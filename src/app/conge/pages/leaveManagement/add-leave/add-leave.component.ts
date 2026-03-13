import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UTILISATEUR } from 'src/app/conge/models/userModel';
import { LeaveService } from 'src/app/conge/services/leave.service';
import { UserService } from 'src/app/conge/services/user.service';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent {
  public employeeid: any;
  private idConge: any;
  public title = "Ajouter un Conge"
  public bodyData = {
    date_debut: '', date_fin: '',
    cause: '', response: '', employeeId: 0, typeCongeId: ''
  }

  users: UTILISATEUR[] = [];
  constructor(private congeService: LeaveService, private userService: UserService, private _route: Router,
    private activateRoute: ActivatedRoute) { }
  getAllUser() {
    this.userService.getAllUtilisateur().subscribe(
      (data: any) => {
        this.users = data;
      }
    )
  }
  ngOnInit() {
    this.getAllUser();
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
    this.bodyData.employeeId = Number(this.employeeid);
    this.congeService.addConge(this.bodyData).subscribe((data: any) => {
      this._route.navigateByUrl('dash/conge')

    })
  }
}
