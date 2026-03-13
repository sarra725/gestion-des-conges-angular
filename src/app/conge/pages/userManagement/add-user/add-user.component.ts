import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UTILISATEUR } from 'src/app/conge/models/userModel';
import { UserService } from 'src/app/conge/services/user.service';
import { LoginService } from 'src/app/layout/services/login.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  private idUser:any;
  public title="Ajouter un utilisateur"
  public bodyData = {
    employeename: '', email: '',
    password: '', roleName: '' }
  constructor(private userService: UserService, private _route: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idUser = this.activateRoute.snapshot.params['id'];
    if (this.idUser){
      this.title="Modifier un utilisateur"
      // this.userService.getUserById(this.idUser).subscribe((data: any) => {
      //   this.userData.email = data.email;
      //   this.userData.nom = data.nom;
      //   this.userData.password = data.password;
      //   this.userData.prenom = data.prenom;
      //   this.userData.tel = data.tel;
      //   this.userData.username = data.username;
      //   this.userData.role = data.role;
      // })
    }else
    this.title="Ajouter un utilisateur"
  }
  addUser() {
    if (this.idUser != undefined) {
      // this.userService.updateUtilisateur(this.idUser, this.userData).subscribe(data => {
      //   this._route.navigateByUrl('/user')
      // });
    } else {
      this.userService.addUtilisateur(this.bodyData).subscribe((data:any) => {
        this._route.navigateByUrl('dash/user')
      });
    }
  }
}
