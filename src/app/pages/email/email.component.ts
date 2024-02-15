import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Email } from 'src/app/models/email.model';
import { EmailService } from 'src/app/services/email.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  emailForm: FormGroup;
  email:Email = new Email();
  to:string= 'zavhier@gmail.com'
  constructor(private formbuilder:FormBuilder,private emailService:EmailService,public nvTrl:ToastrService , private router:Router) { 

  }

  ngOnInit(): void {
  
    this.emailForm = this.formbuilder.group({
      message: ['', [Validators.required, Validators.minLength(2)]],
      asunto: ['', [Validators.required, Validators.minLength(2)]],
  
    });
  }

  submitForm = () => {
    debugger;
    if (this.emailForm.valid) {
        this.email.correo =  this.to;
        this.email.asunto = this.emailForm.value['asunto'];
        this.email.nombre = 'Usuario free tags'
        this.email.tipoenvio  = environment.tipoenvio;
        this.email.mensaje = this.emailForm.value['message']; 
       
         this.emailService.send(this.email).subscribe(resp=>{
           this.nvTrl.success('¡Genial! , tu email fue enviado con exito')
           this.emailForm.value['email'] = '';
           this.emailForm.value['message'] = '';
           this.router.navigate(['/dashboard'])

         })
    } else {
        this.nvTrl.warning('¡Ups!, Faltan datos');
        return console.log('Please provide all the required values!');
    }
  };
}
