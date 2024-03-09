import { Component, OnInit } from '@angular/core';
import {Producto} from '../../models/producto.model';
import {Usuario} from '../../models/usuario.model';
import {ProductoService} from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  _producto:Producto = new Producto();
  _usuario:Usuario = new Usuario();
  access_token:any;
  loading:boolean = false;
  id:number;
  productos:Producto [] = [];
  _estado:string;
  constructor(private productoService:ProductoService, public toas:ToastrService) { }

  ngOnInit(): void {
     this.id = Number(localStorage.getItem('usuarioId'));
     this.access_token = localStorage.getItem('access_token');
     this.productoService.getAllByUsuario(this.id, this.access_token).subscribe(prod=>{
          this.productos = prod.data;      
     })

  }

  onCambiarEstado(){
      this._producto.tipo_estado_id = Number(this._estado);
      this._producto.condicion = "1";
      this.productoService.update(this._producto,this.access_token).subscribe(resp=>{
             this.toas.success('¡Genial! ,  Se cambio el estado correctamente')
      },(erro)=>{
            this.toas.error('¡Ups!, algo salio mal')
      })
  }

  onClickProducto(producto:Producto){
       this._producto = producto
  }
}
