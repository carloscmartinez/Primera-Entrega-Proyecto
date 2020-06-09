import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { SignalRService } from 'src/app/services/signal-r.service';


@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html',
  styleUrls: ['./cliente-consulta.component.css']
})
export class ClienteConsultaComponent implements OnInit {
  
  clientes: Cliente[];
  constructor(private clienteService: ClienteService, private signalRService: SignalRService) { }

  ngOnInit() {
     this.clienteService.get().subscribe(result => {
      this.clientes = result;
    }); 

    this.signalRService.ventaReceived.subscribe((ventaViewModels: Cliente) => {
      this.clientes.push(ventaViewModels);
    });
  }

}
