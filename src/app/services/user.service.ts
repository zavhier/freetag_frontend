import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    _usuario:Usuario = new Usuario();
  
  constructor(private http:HttpClient) {

  }
  login(username:string, password:string){
        var formData: any = new FormData();
        formData.append('username',username);
        formData.append('password', password);
        formData.append('company',  environment.company)
      return this.http.post(environment.host +'auth', formData).pipe(
       tap((resp:any)=>{
         
        }))
  }
/*
 * @param usuario 
 * @return usuario
 */
  save(usuario:Usuario){
      usuario.rol = environment.rol;
      usuario.idEmpresa = environment.company;
      usuario.urlimg = "-";
      return this.http.post(environment.host + 'user' , usuario).pipe(
          tap((resp:any)=>{
              console.log(resp)             
          },
          (err)=>{
              console.log(err)
          })
      )
  }
 /**
  * @param id 
  * @returns  Usuario
  */
  get(id:any, access_token:any):Observable<any>{
      const headers = { 'Authorization': 'Bearer ' + access_token}
      return this.http.get(environment.host+"userbyid/"+id , {headers: headers}).pipe(
        tap((resp:any)=>{
        })
      )
  }
  forgotPassword(email:string){
    var formData:any = new FormData();
    return this.http.post(environment.host + "", formData).pipe(
       tap((resp:any)=>{
           
       })
    )
  }

  recuperarUsuario(email:string):Observable<any>{
    var formData: any = new FormData();
    formData.append('email',email);
    return this.http.post(environment.host +'recoveruser', formData)
  }
    
  update(usuario:Usuario, access_token:any):Observable<any>{
    const headers = { 'Authorization': 'Bearer ' + access_token}
    return this.http.put(environment.host + "user" , usuario, {headers: headers} ).pipe(
      tap((resp)=>{
           return resp
      })
    )
  }
  
  getDataQr(id:any):Observable<any>{
    return this.http.get(environment.host +"productbyqrcode" , id )
  }

}
