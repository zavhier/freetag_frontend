import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) {

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
}