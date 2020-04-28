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
import { LoginComponent } from './usuario/login/login.component';

const routes: Routes = [
  {
    path: 'personaConsulta',
    component: PersonaConsultaComponent
  },
  {
    path: 'clienteConsulta',
    component: ClienteConsultaComponent
  },
  {
    path: 'clienteRegistro',
    component: ClienteRegistroComponent
  },
  {
    path: 'ventaConsulta',
    component: VentaConsultaComponent
  },
  {
    path: 'ventaRegistro',
    component: VentaRegistroComponent
  },
  {
    path: 'usuarioRegistro',
    component: UsuarioRegistroComponent
  },
  {
    path: 'usuarioConsulta',
    component: UsuarioConsultaComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
