import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorCodeEmun } from 'src/app/emuns/errorcode.emun';
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
          this.producto.codigo_qr = this.productoForm.value['codigo'];
        
          this.producto.usuario_id = this.idUsuario;
          this.producto.tipo_producto_id = environment.producto;
          this.producto.tipo_estado_id =  environment.Activo;
          this.producto.serial = ''; 
      
          //Traer el producto de la base desde el codigo Qr
          this.productoService.getProductoByQr(this.producto.codigo_qr).subscribe(resp=>{
            debugger;
                  if(resp.data.estao != ErrorCodeEmun.ERROR_401 &&  resp.data[0] != null ){
                       if(resp.data[0].existe_usuario == 'no'){
                            this.producto.id = resp.data[0].id;
                            this.producto.razon_social_id = resp.data[0].razon_social_id;
                            this.producto.condicion = "1";
                            this.producto.fecha_baja = null;
                            this.producto.url_qr = resp.data[0].url_qr
                            this.producto.urlimg = "-";
                            this.productoService.update(this.producto, this.access_token).subscribe(resp=>{
                              if(resp.data.estao != ErrorCodeEmun.ERROR_401){
                                 this.nvrlt.success('¡Genial!','Producto vinculado')
                                  this.router.navigate(['/productos']);
                              }else{
                                this.nvrlt.warning('¡Ups!, Algo esta faltando' )
                              }
                            })
                       }else{
                           this.nvrlt.warning('¡Ups!, el código es de otro usuario' )
                       }
                       
                  }
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
