import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';

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
  constructor(private productoService:ProductoService, private userService:UserService) { }
  
  ngOnInit(): void {
    this.razon_social = localStorage.getItem('razon_social');
     this.getProductoByRazonSocial();
  }

   getProductoByRazonSocial(){
    debugger;
    this.productoService.getProductByRazonSocial(this.razon_social, this.access_token).subscribe(resp=>{
          this.productos  = resp.data;
    })
  }
  onVerCliente(qr: any){
       this.userService.get(qr.usuario_id).subscribe(resp=>{
              this.usuario = resp.data[0]
       })
  }
}
