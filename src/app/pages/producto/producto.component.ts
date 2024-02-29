import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
 producto:Producto = new Producto();
 productoForm: FormGroup;
 idUsuario:any
 access_token:any;
 fecha:Date;
 constructor(public formBuilder:FormBuilder, private productoService:ProductoService,public nvrlt:ToastrService, private router:Router)  { }

  ngOnInit(): void {
    this.fecha = new Date();
    this.idUsuario = Number(localStorage.getItem('usuarioId'));
    this.access_token = localStorage.getItem('access_token');
    
    this.productoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      descripcion: ['', [Validators.required, Validators.minLength(4)]],
      codigo:['', [Validators.required, Validators.minLength(4)]]
    });
  
  }


  submitForm = () => {    
      if (this.productoForm.valid) {
          this.producto.nombre = this.productoForm.value['nombre'];
          this.producto.descripcion = this.productoForm.value['descripcion'];
          this.producto.corido_qr = this.productoForm.value['codigo'];
          this.producto.razon_social_id = environment.company;
          this.producto.usuario_id = this.idUsuario;
          this.producto.tipo_producto_id = environment.producto;
          this.producto.tipo_estado_id =  environment.Activo;
          this.producto.fecha_creacion =  this.fecha;
          this.producto.urlimg  = '';
          this.producto.url_qr  = '';
          this.producto.serial = ''; 
      
          this.productoService.save(this.producto,this.access_token).subscribe(resp=>{
                this.nvrlt.success('¡Genial! , ya vinculaste tu producto a tu Qr')
                this.clear();
                this.router.navigate(['/productos']);
          },error=>{
                 this.nvrlt.error('¡Ups!, Algo paso' )
            
          })
      } else {
        this.nvrlt.warning('¡Ups!, Algo esta faltando' )
      }
    };

    clear(){
      this.productoForm.value['nombre'] = ''
      this.productoForm.value['descripcion']  =''
     this.productoForm.value['codigo'] =''
    }

}
