import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {RazonSocialService} from '../../services/razon-social.service'
import {UserService} from '../../services/user.service'
import  {RazonSocial} from '../../models/razonsocial.model'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { ErrorCodeEmun } from 'src/app/emuns/errorcode.emun';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  razonSociales :RazonSocial []= []
  access_token:any
  estado:string='200';
  _usuario:Usuario = new Usuario();
  url:string;
  @ViewChild('buttonCerrar') buttonCerrar: ElementRef<HTMLElement>;
  @ViewChild('rzForm', {static: false}) myForm: NgForm;
  rzForm:FormGroup
  constructor(private rzService:RazonSocialService, private usrService:UserService,  private formBuilder:FormBuilder, private nvrlt:ToastrService, private router:Router) { 
    
  }
  ngOnInit(): void {
    this.url = environment.hostqr;
    this.access_token = localStorage.getItem('access_token'); 
    this.rzForm = this.formBuilder.group({
     nombre: ['', [Validators.required, Validators.minLength(4)]],
     direccion: ['', [Validators.required, Validators.minLength(4)]],
     telefono: ['', [Validators.required, Validators.minLength(4)]],
     email: [
       '',
       [
         Validators.required,
         Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
       ],
     ],
    })
     this.getAll();
    
  }

  getAll(){
     this.rzService.getAll().subscribe(resp=>{
       if(resp.estado == ErrorCodeEmun.ESTADO_OK){
        this.razonSociales = resp.data;
       }else if(resp.estado == ErrorCodeEmun.ERROR_401){
          this.router.navigate(['/login'])
          this.nvrlt.info('¡Ups!, la sesión se termino' )
       }else{
        this.nvrlt.error('¡Ups!, Algo paso' )
       }
        
     },(error=>{
            console.log('error ' ,  error)
     }))
  }
  
  
  submitForm = () => {    
    if (this.rzForm.valid) {
<<<<<<< HEAD
=======
     
>>>>>>> cf52c59c75706686b86fc91b4d7a9694817d6d27
        this._usuario.idempresa = environment.company;
        this._usuario.email =  this.rzForm.value['email'];
        this._usuario.nombre = this.rzForm.value['nombre'];
        this._usuario.fecha = new Date();
        this._usuario.genero ='X';
        this._usuario.estado = 1
        this._usuario.rol = 'rz';
        this._usuario.telcel = this.rzForm.value['telefono'];
        this._usuario.telref = this.rzForm.value['telefono'];
        this._usuario.password = environment.passwordRz;
        this.usrService.save(this._usuario).subscribe(resp=>{
          this._usuario = new Usuario();
          if(resp.data.estado == 200){
              let rz:RazonSocial = new RazonSocial();
              rz.idusuario = resp.data.iduser;   
              rz.nombre = this.rzForm.value['nombre'];
              rz.direccion = this.rzForm.value['direccion'];
              rz.telefono = this.rzForm.value['telefono'];
              rz.correo = this.rzForm.value['email'];
              rz.urlimg = '-'
              rz.color = ' '
              this.rzService.save(rz).subscribe(resp=>{
                  if(resp.data.estado ==ErrorCodeEmun.ESTADO_OK){
                    this.nvrlt.success('¡Genial! , proceso exitoso')
                    this.razonSociales = [];
                    this.getAll();
                    let el: HTMLElement = this.buttonCerrar.nativeElement;
                    el.click();
                    this.clear();
                  }else if(resp.data.estado ==ErrorCodeEmun.ERROR_401) {
                    this.router.navigate(['/login'])
                    this.nvrlt.info('¡Ups!, la sesión se termino' )
                  }else{
                      this.nvrlt.error('¡Ups!, Algo paso' )
                      console.log(resp.detalle)
                  }
                  
                  
            },error=>{
                    this.nvrlt.error('¡Ups!, Algo paso' )
                    console.log(error)
            })
          }else if(resp.data.estado ==ErrorCodeEmun.ERROR_401) {
            this.router.navigate(['/login'])
            this.nvrlt.info('¡Ups!, la sesión se termino' )
          }else{
            this.nvrlt.error('¡Ups!, Algo paso' )
            console.log(resp.detalle)
          }
     
        })
   
    } else {
      this.nvrlt.warning('¡Ups!, Algo esta faltando' )
    }
  };



  onAbrirGeneradorDeCogigo(){
    const url = environment.hostqr
	  
	  // Creo un formulario oculto
	  const form = document.createElement('form');
	  form.method = 'post';
	  form.action = url;
	  form.target = '_blank'; 
	  
	  // Creo los campos de entrada para los parámetros access_token y estado
	  const accessTokenInput = document.createElement('input');
	  accessTokenInput.type = 'hidden';
	  accessTokenInput.name = 'access_token';
	  accessTokenInput.value =  this.access_token;

	  const estadoInput = document.createElement('input');
	  estadoInput.type = 'hidden';
	  estadoInput.name = 'estado';
	  estadoInput.value = '200';

	  // Agrego los campos de entrada al formulario
	  form.appendChild(accessTokenInput);
	  form.appendChild(estadoInput);

	  // Agrego el formulario al DOM y lo envio
	  document.body.appendChild(form);
	  form.submit();

	  // Elimino el formulario después de enviarlo para que no me quede basura
	  document.body.removeChild(form);
  }
  clear(){
    this.rzForm.reset();
  }


}

