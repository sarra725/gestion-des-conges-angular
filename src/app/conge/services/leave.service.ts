import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private _http: HttpClient,private _api:ApiService) { }


  getAllConge()
  {
    return this._http.get(this._api.api+"/v1/conge/all")
  }
  getAllCongeByIdUser(id:any)
  {
    return this._http.get(this._api.api+"/v1/conge/all/"+id)
  }
 
  addConge(data:any)
  {
    return this._http.post(this._api.api+"/v1/conge/add",data)
  }

  changeResponse(idConge:any,msg:any){
    return this._http.get(this._api.api+"/v1/conge/response/"+idConge+"/"+msg)
  }
}
