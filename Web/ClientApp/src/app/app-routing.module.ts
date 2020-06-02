import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaConsultaComponent } from './Pulsacion/persona-consulta/persona-consulta.component';
import { RouterModule, Routes } from '@angular/router';
import { ClienteConsultaComponent } from './cliente/cliente-consulta/cliente-consulta.component';
import { ClienteRegistroComponent } from './cliente/cliente-registro/cliente-registro.component';
import { VentaConsultaComponent } from './venta/venta-consulta/venta-consulta.component';
import { VentaRegistroComponent } from './venta/venta-registro/venta-registro.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { UsuarioConsultaComponent } from './usuario/usuario-consulta/usuario-consulta.component';
import { LoginComponent } from './login/login.component';
import { ClienteModificarComponent } from './cliente/cliente-modificar/cliente-modificar.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'personaConsulta',
    component: PersonaConsultaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'clienteConsulta',
    component: ClienteConsultaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'clienteRegistro',
    component: ClienteRegistroComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ventaConsulta',
    component: VentaConsultaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ventaRegistro',
    component: VentaRegistroComponent, canActivate: [AuthGuard]
  },
  {
    path: 'usuarioRegistro',
    component: UsuarioRegistroComponent, canActivate: [AuthGuard]
  },
  {
    path: 'usuarioConsulta',
    component: UsuarioConsultaComponent,  canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'clienteModificar/:id',
    component: ClienteModificarComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
