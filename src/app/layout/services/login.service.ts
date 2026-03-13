import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/conge/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _api:ApiService,private _http:HttpClient) { }

public logIn(data:any) {
  return this._http.post(this._api.api+"/v1/employee/login", data);
}
 
}
