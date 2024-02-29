import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {RazonSocialService} from '../../services/razon-social.service'
import {UserService} from '../../services/user.service'
import  {RazonSocial} from '../../models/razonsocial.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  razonSociales :RazonSocial []= []
  @ViewChild('buttonCerrar') buttonCerrar: ElementRef<HTMLElement>;
  rzForm:FormGroup
  constructor(private rzService:RazonSocialService, private usrService:UserService,  private formBuilder:FormBuilder, private nvrlt:ToastrService) { 
     
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
  }
  ngOnInit(): void {
     this.getAll();
  }

  getAll(){
     this.rzService.getAll().subscribe(resp=>{
      debugger;
         this.razonSociales = resp.data;
     },(error=>{
            console.log('error ' ,  error)
     }))
  }
  
  
  submitForm = () => {    
    if (this.rzForm.valid) {
       let _usuario:Usuario = new Usuario();
        _usuario.idempresa = environment.company;
        _usuario.email =  this.rzForm.value['email'];
        _usuario.nombre = this.rzForm.value['nombre'];
        _usuario.fecha = new Date();
        _usuario.genero ='M';
        _usuario.estado = 1
        _usuario.rol = 'rz';
        _usuario.telcel = this.rzForm.value['telefono'];
        _usuario.telref = this.rzForm.value['telefono'];
        _usuario.password = 'password1234'
        this.usrService.save(_usuario).subscribe(resp=>{
          debugger
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
                  if(resp.data.estado =='200'){
                    this.nvrlt.success('¡Genial! , proceso exitoso')
                    this.rzForm = null
                    this.razonSociales = [];
                    this.getAll();
                    let el: HTMLElement = this.buttonCerrar.nativeElement;
                    el.click();
                  }else{
                  this.nvrlt.error('¡Ups!, Algo paso' )
                  console.log(resp.detalle)
                  }
                  
                  
            },error=>{
                    this.nvrlt.error('¡Ups!, Algo paso' )
                    console.log(error)
            })
          }else{
            this.nvrlt.error('¡Ups!, Algo paso' )
            console.log(resp.detalle)
          }
     
        })
   
    } else {
      this.nvrlt.warning('¡Ups!, Algo esta faltando' )
    }
  };


}

