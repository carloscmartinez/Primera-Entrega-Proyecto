import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    path: 'clienteConsulta',
    component: ClienteConsultaComponent, canActivate: [AuthGuard], data: { roles: ["Administrador","Vendedor"]}
  },
  {
    path: 'clienteRegistro',
    component: ClienteRegistroComponent, canActivate: [AuthGuard], data: { roles: ["Administrador","Vendedor"]}
  },
  {
    path: 'ventaConsulta',
    component: VentaConsultaComponent, canActivate: [AuthGuard], data: { roles: ["Administrador","Vendedor"]}
  },
  {
    path: 'ventaRegistro',
    component: VentaRegistroComponent, canActivate: [AuthGuard], data: { roles: ["Administrador","Vendedor"]}
  },
  {
    path: 'usuarioRegistro',
    component: UsuarioRegistroComponent, canActivate: [AuthGuard], data: { roles: ["Administrador"]}
  },
  {
    path: 'usuarioConsulta',
    component: UsuarioConsultaComponent,  canActivate: [AuthGuard], data: { roles: ["Administrador"]}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'clienteModificar/:id',
    component: ClienteModificarComponent, canActivate: [AuthGuard], data: { roles: ["Administrador","Vendedor"]}
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
