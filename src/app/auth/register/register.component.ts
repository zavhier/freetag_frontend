import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import {EmailService} from '../../services/email.service'
import { Email } from 'src/app/models/email.model';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import {ErrorCodeEmun  } from '../../emuns/errorcode.emun';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  usuario:Usuario= new Usuario();
  email:Email = new  Email();
  codigo:string  ='';
  soyCliente:boolean = false;
  _soyOno:string= 'Si'
  _activarQr:boolean = false;
  access_token:any;
  usuarioId:any;
  constructor(
              public formBuilder:FormBuilder, public usuerService:UserService, public nvTrl:ToastrService ,
              private  emailService:EmailService, private router:Router, private activatedRoute:ActivatedRoute,
              private productoService:ProductoService) { 
              }

  ngOnInit(): void {
    this.codigo =  this.activatedRoute.snapshot.paramMap.get('id')
    if(this.codigo != '' || this.codigo != null){
          this._activarQr = true
    }else{
          this._activarQr = false 
    }
      
    
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      password:['',Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      telcel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      telref: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  submitForm = () => {
    debugger;
     if(!this.soyCliente){ //"No es == a si es cliente por eso no debe validar el formulario "
            if (this.registroForm.valid) {
              this.usuario.nombre = this.registroForm.value['nombre'];
              this.usuario.email = this.registroForm.value['email'];
              this.usuario.password = this.registroForm.value['password'];
              this.usuario.estado = 1;
              this.usuario.genero = 'M';
              this.usuario.telcel = this.registroForm.value['telcel'];
              this.usuario.telref = this.registroForm.value['telref'];
              this.email.asunto = '¡Genial!, Ya casi sos parte de freetags';
              this.email.correo = this.usuario.email;
              this.email.nombre = this.usuario.nombre;
              this.email.tipoenvio  = environment.tipoenvio;
              this.email.mensaje = environment.correoBienv;
              this.usuario.idempresa =environment.company;
              this.usuario.fecha = new Date();
              this.usuario.rol  = environment.rol;
              this.usuerService.save(this.usuario).subscribe(resp=>{
                    if(resp.estado !=  ErrorCodeEmun.ERROR_404 ){
                      this.nvTrl.success('¡Genial!, Ya casi sos parte de freetags' )
                      this.envioMail();
                      this.updateCodigoQrByCliente(resp.data.iduser);
                      this.router.navigate(['/login']);
                    }else{
                      this.nvTrl.error('¡Ups!, Algo paso' )
                    }
              })
              return false;
        
          } else {
              this.nvTrl.warning('¡Ups!, Faltan datos');
              return console.log('Please provide all the required values!');
          }
     }else{
          this.crearProducto();
       
     }
  
  };
  envioMail(){
    this.emailService.send(this.email).subscribe(resp=>{console.log('envio de email')});
  }
  /**El usuario se registro, solo falta hacer el update del codigo qr con el id del usario **/
  updateCodigoQrByCliente(iduser:number){
       this.productoService.updateProductoQrByNewUsuarioId(iduser,this.codigo).subscribe(resp=>{
          this.nvTrl.success('¡Genial!, su qr ya esta vinculado' )
       })
  }
  onCliente(){
    if(this.soyCliente) {
        this.soyCliente= false;
        this._soyOno = 'Si'
        this.registroForm.controls['nombre'].enable();
        this.registroForm.controls['apellido'].enable();
        this.registroForm.controls['telref'].enable();
        this.registroForm.controls['telcel'].enable();
        
    } else{
      this.soyCliente= true;
      this._soyOno = 'No'
      this.registroForm.controls['nombre'].disable();
      this.registroForm.controls['apellido'].disable();
      this.registroForm.controls['telref'].disable();
      this.registroForm.controls['telcel'].disable();
      
      this.nvTrl.success('Bienvenido!, Solo tienes que ingresar tu email' )
    }
  }
  onValidarUsuario(){
      if(!this.soyCliente){
       let  email = this.registroForm.value['email'];
       if(email != ''){
            this.usuerService.getValidarExisteUsuario(email).subscribe(resp=>{
              debugger;
               if(resp.data[0].existe == '1'){
                    this.nvTrl.warning('¡Ups!, Lo siento el email ya esta registrado');
               }
            })
       }
    }
  }
  
  /**
   * Crear un producto des un un usuario que ya existe per leer un nuevo QR
  */
  crearProducto(){
       let password  = this.registroForm.value['password']
       let email:string  = this.registroForm.value['email'] 
       if(password !='') {
        if(this.codigo != ''){
          this.usuerService.login(email,password).subscribe(resp=>{
            debugger;
            if(resp.data.estado == ErrorCodeEmun.ERROR_404 ||resp.data.estado == ErrorCodeEmun.ERROR_401){
                 this.nvTrl.error('¡Ups, algo malo paso!')
            }else{
              this.access_token =  resp.data.access_token;
              this.usuarioId  =  resp.data.idusuario;
              this.updateCodigoQrByCliente(this.usuarioId);
            }
          })
        }else{
          this.nvTrl.warning('¡Ups!, esta faltando el código ');   
        }

       }else{
        this.nvTrl.warning('¡Ups!, No te olvides de ingresar el mail ');
       }
  }
}
