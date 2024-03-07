import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { RespuestaQr } from 'src/app/models/respuesta.qr.model';
import { UserService } from 'src/app/services/user.service';
import { GeoService} from 'src/app/services/geo.service';
import { Email } from 'src/app/models/email.model';
import { EmailService } from 'src/app/services/email.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  usuario:Usuario = new Usuario();
  id:any
  respuestaQr:RespuestaQr = new RespuestaQr();
  email:Email= new Email();
  _notas:string = '';
  constructor(private usuarioService:UserService, private router:ActivatedRoute, private route:Router, private geoService:GeoService, private emailService:EmailService, private toast:ToastrService) { }

  ngOnInit( ): void {
    
    this.id = this.router.snapshot.paramMap.get('id')
    if(this.id != '')this.getData();

  }
  getData(){
    /**
     * 1-verificar si e código qr existe 
     * 2-Si existe y tiene un codigo de usuario es por que tenemos que mostrar la pagiana de búsqueda  
     * 3-Si existe pero no tiene código de usuario no  va a pagina de registro 
     * **/
     this.usuarioService.getDataQr(this.id).subscribe(rep=>{
         this.respuestaQr = rep.data[0];
         /**El código qr es de un cliente**/
          if(this.respuestaQr.existe_usuario == 'no'){
            this.route.navigate(["/registro", this.respuestaQr.codigo_qr])
         }
     })
  }
  onAvisar(){
       this.geoService.getUserLocation().then(res=>{
           this.email.asunto = 'Hola!, te estamos buscando';
           this.email.correo = this.respuestaQr.correo;
           this.email.nombre = this.respuestaQr.nombre;
           this.email.tipoenvio  = environment.tipoenvio;
           this.email.mensaje = environment.correoBusqueda 
           if(this._notas != ''){
              this.email.mensaje = this.email.mensaje + " y nos compartio la siguiente información, " + this._notas;
           }
           this.email.link = 'https://www.google.com/maps?q=' +res[0] +"," + res[1] +"&z=22";
           debugger;
           this.emailService.send(this.email).subscribe(resp=>{
                 this.toast.show('Muchas gracias!!!')
                 this._notas = '';
           })
       })
  }
}
