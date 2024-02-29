import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PagesComponent } from './pages/pages.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import {AuthGuard} from  './services/guard/authguard';
import { EmailComponent } from './pages/email/email.component';
import { SearchComponent } from './shared/search/search.component';
import { QrComponent } from './pages/qr/qr.component';

const routes: Routes = [
  {
    path:'', component:PagesComponent,
    children:[
      {path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
      {path:'profile', component:ProfileComponent,canActivate: [AuthGuard]},   
      {path:'cliente', component:ClientesComponent,canActivate: [AuthGuard]},    
      {path:'', component:DashboardComponent, canActivate: [AuthGuard]},    
      {path:'producto', component:ProductoComponent,canActivate: [AuthGuard]},    
      {path:'productos', component:ProductosComponent,canActivate: [AuthGuard]},
      {path:'email' , component:EmailComponent , canActivate:[AuthGuard]},
      {path:'qr' , component:QrComponent , canActivate:[AuthGuard]}    
    ]
   },
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegisterComponent},
  {path:'registro/:id', component:RegisterComponent},
  {path:'buscar/:id', component:SearchComponent},
  {path:'**', component:NopagefoundComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
