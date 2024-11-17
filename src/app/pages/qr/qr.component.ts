import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorCodeEmun } from 'src/app/emuns/errorcode.emun';
import { Producto } from 'src/app/models/producto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';
import {BorradoLogicoEmun} from 'src/app/emuns/utils.emun';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  razon_social:string
  productos:Producto [] = [];
  access_token:any;
  usuario:Usuario = new Usuario();
  constructor(private productoService:ProductoService, private userService:UserService, private toas:ToastrService, private router:Router) { }
  
  ngOnInit(): void {
    this.razon_social = localStorage.getItem('razon_social');
    this.access_token = localStorage.getItem('access_token');
     this.getProductoByRazonSocial();
  }

   getProductoByRazonSocial(){
<<<<<<< HEAD
=======
    debugger;
>>>>>>> cf52c59c75706686b86fc91b4d7a9694817d6d27
    this.productoService.getProductByRazonSocial(this.razon_social, this.access_token).subscribe(resp=>{
          this.productos  = resp.data;
    })
  }
  onVerCliente(qr: any){
       this.userService.get(qr.usuario_id,this.access_token).subscribe(resp=>{
              this.usuario = resp.data[0]
       })
  }
  onBorrar(item:Producto){
         this.productoService.deleteProdcuto(item.id, BorradoLogicoEmun.BORRADO  ,this.access_token).subscribe(resp=>{
             if(resp.data.estado == ErrorCodeEmun.ESTADO_OK) {
                  this.toas.info('El producto se ha eliminado correctamente')
                  let idx = this.productos.indexOf(item);
                  this.productos.splice(idx,1);
             } else if(resp.estado == ErrorCodeEmun.ERROR_401){
                  this.toas.info('¡Ups!, la sesión se termino' ) 
                  this.router.navigate(['/login'])
             }
             else{
                  this.toas.error('¡Ups!, algo malo paso')
             }
        })
  }
  
  onVerCodigo(item:Producto){
    let url = environment.hostUrlCodigo +"/"+ item.urlimg + "/"  + item.codigo_qr +".png"
    window.open(url, "_blank");
  } 

}
