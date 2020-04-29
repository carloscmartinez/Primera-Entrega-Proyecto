import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../models/cliente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.css']
})
export class ClienteRegistroComponent implements OnInit {

  cliente:  Cliente;
  constructor(
    private clienteService: ClienteService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.cliente= new  Cliente();
  }

  add() {
    this.clienteService.post(this.cliente).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Cliente creada!!! :-)';

        // alert('Cliente Registrado!');
        this.cliente = p;
      }
    });
  }


}
