import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CrudService<T> {

  constructor(private http:HttpClient,private baseUrl: string) { 

  }

  getAll():Observable<T[]>{
     return this.http.get<T[]>(this.baseUrl);
  }
  getAllById(id:any):Observable<T[]>{
      return this.http.get<T[]>(`${this.baseUrl}/${id}`);
  }
  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
