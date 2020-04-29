import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PersonaConsultaComponent } from './Pulsacion/persona-consulta/persona-consulta.component';
import { AppRoutingModule } from './app-routing.module';
import { ClienteConsultaComponent } from './cliente/cliente-consulta/cliente-consulta.component';
import { ClienteRegistroComponent } from './cliente/cliente-registro/cliente-registro.component';
import { ClienteService } from './services/cliente.service';
import { VentaRegistroComponent } from './venta/venta-registro/venta-registro.component';
import { VentaConsultaComponent } from './venta/venta-consulta/venta-consulta.component';
import { UsuarioConsultaComponent } from './usuario/usuario-consulta/usuario-consulta.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { LoginComponent } from './usuario/login/login.component';
import { NgbCollapse, NgbDropdown, NgbDropdownMenu,NgbDropdownToggle,NgbDropdownItem,NgbDropdownAnchor, NgbActiveModal, NgbModal, NgbModalRef, NgbModalConfig, NgbModalOptions, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './@base/alert-modal/alert-modal.component';
import { FiltroClientePipe } from './pipe/filtro-cliente.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PersonaConsultaComponent,
    ClienteConsultaComponent,
    ClienteRegistroComponent,
    VentaRegistroComponent,
    VentaConsultaComponent,
    UsuarioConsultaComponent,
    UsuarioRegistroComponent,
    LoginComponent,
    AlertModalComponent,
    FiltroClientePipe
    // NgbCollapse,NgbDropdown,NgbDropdownMenu,NgbDropdownToggle,NgbDropdownItem,NgbDropdownAnchor, AlertModalComponent,
    // NgbActiveModal,NgbModalConfig,NgbModalRef,NgbModal
  ],
  imports: [
    
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    AppRoutingModule,
    NgbModule
  ],
  entryComponents: [AlertModalComponent],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
