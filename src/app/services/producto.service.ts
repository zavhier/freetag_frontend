import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WriteLogServiceService } from './write-log-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient, private log:WriteLogServiceService) {

  }
  save(producto:Producto, access_token:any):Observable<Producto>{
    debugger;
      const headers = { 'Authorization': 'Bearer ' + access_token}
      return this.http.post<Producto>(environment.host +'produc' , producto,{ headers: headers})        ;
  }

  getAllByUsuario(usuarioId:any, access_token:string):Observable<any>{
    const headers = { 'Authorization': 'Bearer ' + access_token}
    return this.http.get<any>(environment.host +'producbyuser/'+  usuarioId, {headers: headers}).pipe(
      tap((resp:any)=>{
          resp.data;
      })
    );
  }
  update(producto:Producto,access_token:any):Observable<any>{
    const headers = { 'Authorization': 'Bearer ' + access_token}
     return this.http.put(environment.host + 'produc', producto, {headers: headers} );
  }
  getProductByRazonSocial(razon_social:any, access_token:string):Observable<any>{
     const headers = { 'Authorization': 'Bearer ' + access_token}
     return this.http.get(environment.host + "productbysocialreason/" + razon_social,  {headers: headers} ).pipe(
        tap((resp:any)=>{
          console.log(resp)
      }, err => {
      console.error(err);
        this.log.write(err);
      })
     )
  }

  updateProductoQrByNewUsuarioId(usuario:number, qr:string){
    return this.http.put(environment.host + "productbyqrcode" ,{"codigo_qr":qr, "usuario_id":usuario}).pipe(
        tap((resp:any)=>{
          console.log(resp)
      }, err => {
      console.error(err);
        this.log.write(err);
        })
      )
  }

  getProductoByQr(qr:string):Observable<any>{
    return this.http.get(environment.host + 'productbyqrcode/' + qr).pipe(
          tap((resp:any)=>{
            console.log(resp)
        }, err => {
        console.error(err);
          this.log.write(err);
      })
    )
  }

  updateProductEstado(id:number, estadoId:number, access_token:any):Observable<any>{
    const headers = { 'Authorization': 'Bearer ' + access_token}
    return this.http.put(environment.host + "producbystate" ,{"id":id, "tipo_estado_id":estadoId},{headers: headers}).pipe(
          tap((resp:any)=>{
            console.log(resp)
        }, err => {
           console.error(err);
          this.log.write(err);
       })
    )
  }

  deleteProdcuto(id:number, estado:number,access_token ):Observable<any>{
    const headers = { 'Authorization': 'Bearer ' + access_token}
    return this.http.put(environment.host + "producbycondition" ,{"id":id, "condicion":estado},{headers: headers}).pipe(
         tap((resp:any)=>{
             console.log(resp)
         }, err => {
          console.error(err);
           this.log.write(err);
        })
        )
      }
  
}
