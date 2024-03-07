import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WriteLogServiceService {

  constructor(private http:HttpClient) { }


  write(msj:string):Observable<any>{
      return  this.http.post(environment.host + 'writetologfile',{"text": msj})
  }
}
