import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../models/cliente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of, observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

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

// function passwordMatchValidator(g: FormGroup) {
//    return g.get('password').value === g.get('passwordRepeat').value
//       ? null : {'mismatch': true};
// }
    //buscar el cliente 

    // validaId(ctrl: AbstractControl) {
    //   return (
    //     this.buscarCliente(ctrl.value).pipe(map(taken => taken ? { taken: true } : null))
    //   )
    // }
    // validateEmailNotTaken(ctrl: AbstractControl) {
    //   return (
    //     this
    //      .checkForExists(ctrl.value)
    //      .pipe(map(taken => taken ? { taken: true } : null))
    //   )
    // }

    /* validaId(ctrl: AbstractControl) {
      const n = ctrl.value;
     
       if(n!=null){
        this.clienteService.getId(n).subscribe(cliente => cliente ?{ cliente: true} : null)
                           
       };
      
       return null;
   } */
      
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
