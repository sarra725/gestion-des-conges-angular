import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/conge/services/local.service';
import { UserService } from 'src/app/conge/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private userService:UserService,private localstorage:LocalService,
    private _route:Router
  ){}

  public roleControl():String {    
      return this.userService.user_role.toUpperCase();
  }


  logOut() {
    this.localstorage.clearData();
    this._route.navigateByUrl('');
  }
}
