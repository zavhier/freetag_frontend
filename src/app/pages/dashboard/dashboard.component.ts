import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  idUsuario:any;
  access_token :any;
  usuario:Usuario  = new Usuario();
  formUpdate:FormGroup
  constructor(private usuarioService:UserService , private nvtl:ToastrService , private formBuilder:FormBuilder) { }


  ngOnInit(): void {
     this.idUsuario = Number(localStorage.getItem('usuarioId'));
     this.access_token = localStorage.getItem('access_token'); 
     this.getData();
     this.formUpdate = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      telcel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      telref: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
     })
     
  }

  getData(){
    this.usuarioService.get(this.idUsuario, this.access_token).subscribe(resp=>{
      this.usuario = resp.data[0];
      localStorage.setItem('nombre',  this.usuario.nombre);
      localStorage.setItem('email',  this.usuario.email);
      this.formUpdate.controls.nombre.setValue( this.usuario.nombre);
      this.formUpdate.controls.telcel.setValue( this.usuario.telcel);
      this.formUpdate.controls.telref.setValue( this.usuario.telref);
      this.formUpdate.controls.email.setValue( this.usuario.email);
   })
  }
  
  onSubmitFor = () => {
    debugger;
    if (this.formUpdate.valid) {
        this.usuario.id = this.idUsuario;
        this.usuario.nombre = this.formUpdate.value['nombre'];
        this.usuario.email = 'zavhier@gmail.com'//this.formUpdate.value['email'];
        this.usuario.estado = 1;
        this.usuario.genero = 'M';
        this.usuario.telcel = this.formUpdate.value['telcel'];
        this.usuario.telref = this.formUpdate.value['telref'];
        this.usuario.rol  = environment.rol;

        this.usuarioService.update(this.usuario, this.access_token).subscribe(resp=>{
            this.nvtl.success('¡Genial!, los información se cambio correctamente');      
            this.getData();
        })
        
        return false;
   
    } else {
        this.nvtl.warning('¡Ups!, Faltan datos');
        return console.log('Please provide all the required values!');
    }
  };

}
