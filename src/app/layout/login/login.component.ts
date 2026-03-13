import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/conge/services/user.service';
import { LocalService } from 'src/app/conge/services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _route: Router, private loginService: LoginService, private modalService: NgbModal,
    private userService: UserService, private localStorage: LocalService) { }
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
  public msg = "";
  public loginIn(content: any) {
    this.loginService.logIn(this.loginForm.value).subscribe((data: any) => {     
      this.msg = data.message;
      if (data.status) {
        this.localStorage.saveData("logIn", "true");
        this.localStorage.saveData("role", data.roleName);
        this.localStorage.saveData("id", String(data.idUser));
        this.userService.user_role = data.roleName;
        if (data.roleName == "USER")
          this._route.navigate(['dash/congeuser']);
        else
          this._route.navigate(['dash/user']);
      }
      else {
        this.modalService.open(content, { centered: true })
      }

    })


  }



}
