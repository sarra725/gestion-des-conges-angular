import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private _api: ApiService) { }
  private userRole: string = "";

  
  public get user_role() : string {
    return this.userRole;
  }
  
  public set user_role(v : string) {
    this.userRole = v;
  }
  
  public addUtilisateur(bodyData: any) {
    return this._http.post(this._api.api + "/v1/employee/save", bodyData, { responseType: 'text' });
  }
  public getAllUtilisateur() {
    return this._http.get(this._api.api + "/v1/employee/list");
  }
  public getUtilisateurById(id:any) {
    return this._http.get(this._api.api + "/v1/employee/list/"+id);
  }
  
}
