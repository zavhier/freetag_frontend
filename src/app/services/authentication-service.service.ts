import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor() { 
        
  }

  getIsLoggedIn(){
       return localStorage.getItem('IsLoggedIn');
  }
}
