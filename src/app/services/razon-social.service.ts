import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RazonSocial } from '../models/razonsocial.model';

@Injectable({
  providedIn: 'root'
})


export class RazonSocialService {

  access_token:any
  constructor(private httpCliente: HttpClient) { 
    this.access_token  = localStorage.getItem('access_token')
  }

  getAll():Observable<any>{
    const headers = { 'Authorization': 'Bearer ' + this.access_token}
    return this.httpCliente.get(environment.host + "socialreason",{headers: headers}).pipe(
        tap((resp:any)=>{
             resp.data
        })
    )
  }
  save(rz:RazonSocial):Observable<any>{
    const headers = { 'Authorization': 'Bearer ' + this.access_token}
     return this.httpCliente.post(environment.host + "socialreason", rz ,{headers:headers})
  }

}
