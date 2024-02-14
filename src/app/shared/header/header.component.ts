import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuername:string = ''
  email:string = '';
  constructor(private router:Router) { }

  ngOnInit(): void {
        this.usuername = localStorage.getItem('nombre')
        this.email = localStorage.getItem('email');
  }

  onLogut(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuarioId')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('nombre')
    localStorage.removeItem('email')
    localStorage.clear();
    this.router.navigate(["/login"])
  }
}
