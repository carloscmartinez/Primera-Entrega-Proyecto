import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../models/cliente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.css']
})
export class ClienteRegistroComponent implements OnInit {
  formGroup: FormGroup;
  cliente:  Cliente;
  submitted= false;

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.buildForm();
    // this.cliente= new  Cliente();
  }
  // private buildForm() {
  //    this.formGroup = this.formBuilder.group({ });
  // }
  private buildForm() {
        this.cliente = new Cliente();
        this.cliente.clienteId= 0;
        this.cliente.nombre = '';
        this.cliente.apellido= '';
        this.cliente.telefono = '';
        
        this.formGroup = this.formBuilder.group({
          clienteId: [this.cliente.clienteId, Validators.required],
          nombre: [this.cliente.nombre, Validators.required],
          apellido: [this.cliente.apellido, Validators.required],
          telefono : [this.cliente.telefono, Validators.required]
        });
      }
    get control() { 
      return this.formGroup.controls;
    }
    // onResetForm(){
    //   this.formGroup.reset();
    // }
    onSubmit() {
      this.submitted = true;
       if (this.formGroup.invalid) {
          return;
       }
       this.add();
       this.formGroup.reset();
    }
      
      
  add() {
    this.cliente= this.formGroup.value;
    this.clienteService.post(this.cliente).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Cliente Registrado!!! :-)';

        // alert('Cliente Registrado!');
        this.cliente = p;
      }
    });
    
  }

  onReset() {
    this.submitted = false;
    this.formGroup.reset();
}


}
