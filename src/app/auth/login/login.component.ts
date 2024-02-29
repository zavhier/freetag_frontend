import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from 'src/app/models/email.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading:boolean= false;
  email:string='';
  password:string='';
  formRecordarUsuario:FormGroup;
  emailEnvio:Email = new Email();
  access_token:any;
  constructor(private _userService:UserService, public router:Router,  public nvrl: ToastrService, private fromBuilder:FormBuilder) { }

  ngOnInit(): void {
     this.formRecordarUsuario = this.fromBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
     })
     
  }

  onLogin(){
    this.loading = true;
    this._userService.login(this.email,this.password).subscribe(resp=>{
       if(resp.data.estado == '401'){
        this.nvrl.error('¡Ups, algo malo paso!')
       }else{
          localStorage.setItem('access_token', resp.data.access_token);
          localStorage.setItem('usuarioId' ,  resp.data.idusuario);
          localStorage.setItem('rol' ,  resp.data.rol);
          localStorage.setItem('razon_social' ,  resp.data.razon_social);
          localStorage.setItem('IsLoggedIn' , 'true');
          this.loading= false;
          this.router.navigate(['/dashboard']);
       }
     })

  }

  onRecuperarUsuario(){
    
  }
  togglePasswordMode(input: any){
      input.type = input.type === 'password' ?  'text' : 'password';
  }
 
  onRecuperarUsuarioSubmit = () => {
    debugger;
    if (this.formRecordarUsuario.valid) {
       let correo =  this.formRecordarUsuario.value['email'];
       this._userService.recuperarUsuario(correo).subscribe(resp=>{
            this.nvrl.success('¡Genial!, te enviamos un email')
       },(e)=>{
            this.nvrl.error('¡Ups!, algo salio mal');
       })
       
    } else {
        this.nvrl.warning('¡Ups!, Faltan datos');
        return console.log('Please provide all the required values!');
    }
  };

}
