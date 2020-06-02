import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cliente-consulta-modal',
  templateUrl: './cliente-consulta-modal.component.html',
  styleUrls: ['./cliente-consulta-modal.component.css']
})
export class ClienteConsultaModalComponent  {

  constructor(public activeModal: NgbActiveModal) { }

  actualizar(cliente: Cliente) {
    this.activeModal.close(cliente);
 }
//   ngOnInit() {
//   }

}
