import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import {EmailService} from '../../services/email.service'
import { Email } from 'src/app/models/email.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  usuario:Usuario= new Usuario();
  email:Email = new  Email();
  constructor(public formBuilder:FormBuilder, public usuerService:UserService, public nvTrl:ToastrService ,
              private  emailService:EmailService, private router:Router ) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      password:['',Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      telcel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      telref: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  submitForm = () => {
    if (this.registroForm.valid) {
        this.usuario.nombre = this.registroForm.value['nombre'];
        this.usuario.email = this.registroForm.value['email'];
        this.usuario.password = this.registroForm.value['password'];
       // this.usuario.fecha = new Date();
        this.usuario.estado = 1;
        this.usuario.genero = 'M';
        this.usuario.telcel = this.registroForm.value['telcel'];
        this.usuario.telref = this.registroForm.value['telref'];
        this.email.asunto = '¡Genial!, Ya casi sos parte de freetags';
        this.email.correo = this.usuario.email;
        this.email.nombre = this.usuario.nombre;
        this.email.tipoenvio  = environment.tipoenvio;
        this.email.mensaje = environment.correoBienv;
        this.usuario.company = environment.company;
        this.usuario.fecha = new Date();
        this.usuario.rol  = environment.rol;
        this.usuerService.save(this.usuario).subscribe(resp=>{
              if(resp.estado != '404'){
                  debugger;
                 this.nvTrl.success('¡Genial!, Ya casi sos parte de freetags' )
                 this.envioMail();
                 this.router.navigate(['/login']);
              }else{
                this.nvTrl.error('¡Ups!, Algo paso' )
              }
        })
     
        return false;
   
    } else {
        this.nvTrl.warning('¡Ups!, Faltan datos');
        return console.log('Please provide all the required values!');
    }
  };


  envioMail(){
    this.emailService.send(this.email).subscribe(resp=>{console.log('envio de email')});
  }
}
