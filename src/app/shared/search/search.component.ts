import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  usuario:Usuario = new Usuario();
  id:any
  constructor(private usuarioService:UserService, private router:ActivatedRoute) { }

  ngOnInit( ): void {
    
    this.id = this.router.snapshot.paramMap.get('id')
    if(this.id != '')this.getData();

  }
  getData(){
     this.usuarioService.getDataQr(this.id).subscribe(rep=>{
           this.usuario = rep.data[0];
     })
  }
}
