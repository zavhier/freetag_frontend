import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import {WriteLogServiceService} from '../services/write-log-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    _usuario:Usuario = new Usuario();
    access_token:any
  constructor(private http:HttpClient, private log:WriteLogServiceService) {
    this.access_token  = localStorage.getItem('access_token')
  }
  login(username:string, password:string){
       var formData: any = new FormData();
        formData.append('username',username);
        formData.append('password', password);
        formData.append('company',   username=='admin' ?  environment.companyAdmin :  environment.company)
      return this.http.post(environment.host +'auth', formData).pipe(
        tap((resp:any)=>{
            console.log(resp)
          }))
  }
/*
 * @param usuario 
 * @return usuario
 */
  save(usuario:Usuario){
      usuario.rol =  usuario.rol == 'rz' ?  usuario.rol :environment.rol;
      usuario.idempresa = environment.company;
      usuario.urlimg = "-";
      return this.http.post(environment.host + 'user' , usuario).pipe(
          tap((resp:any)=>{
              console.log(resp)             
          },
          (er)=>{
            this.writeLog(er);
          })
      )
  }
 /**
  * @param id 
  * @returns  Usuario
  */
  get(id:any, access_token_usr:any):Observable<any>{
      const headers = { 'Authorization': 'Bearer ' + access_token_usr}
      return this.http.get(environment.host+"userbyid/"+id , {headers: headers}).pipe(
        tap((resp:any)=>{
            console.log(resp)
        },er=>{
             this.writeLog(er);
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
  /*recuperarUsuario(email:string):Observable<any>{
    var formData: any = new FormData();
    formData.append('email',email);
    return this.http.post(environment.host +'recoveruser', formData)
  }*/

  recuperarUsuario(email: string): Observable<any> {
    const body = { email: email }; // Crea el objeto con el email
    return this.http.post(environment.host + 'recoveruser', body, {
        headers: { 'Content-Type': 'application/json' } // Asegúrate de que el tipo de contenido sea JSON
    });
}


  update(usuario:Usuario, access_token:any):Observable<any>{
    const headers = { 'Authorization': 'Bearer ' + access_token}
    return this.http.put(environment.host + "user" , usuario, {headers: headers} ).pipe(
      tap((resp)=>{
           return resp
      },er=>{
         this.writeLog(er);
      })
    )
  }
  getDataQr(id:any):Observable<any>{
    return this.http.get(environment.host +"productbyqrcode/"+ id )
  }
  getUsuarioByEmail(email:string, access_token):Observable<any>{
    const headers = { 'Authorization': 'Bearer ' + access_token}
     return this.http.post(environment.host + 'userbyemail ',{"email":email},{headers: headers});
  }
  getValidarExisteUsuario(email:string):Observable<any>{
    debugger;
       return this.http.post(environment.host + 'checkexistsuser', {"email":email, 'idcompania':environment.company})
  }


  writeLog(msj:string){
       this.log.write(msj).subscribe(resp=>{console.log(resp)})
  }


  sso(access_token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
     return this.http.post(environment.hostqr,  {'access_token':access_token, 'estado':200},{ headers })
  }


}
