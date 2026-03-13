import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private _api="http://localhost:8080/api"
  constructor() { }
  
  public get api() : string {
    return this._api;
  }
  
}
