import { Component, OnInit } from '@angular/core';
import { Venta } from '../models/venta';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { VentaService } from 'src/app/services/venta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/cliente/models/cliente';
import { ClienteConsultaModalComponent } from 'src/app/cliente/modals/cliente-consulta-modal/cliente-consulta-modal.component';

@Component({
  selector: 'app-venta-registro',
  templateUrl: './venta-registro.component.html',
  styleUrls: ['./venta-registro.component.css']
})
export class VentaRegistroComponent implements OnInit {
  venta: Venta;
  formGroup: FormGroup;
  submitted= false

  constructor(
    private ventaService: VentaService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
        this.venta= new Venta();
        let myDate = new Date();
        //this.venta.ventaId = 0;
        this.venta.fecha = myDate;
        this.venta.numeroPaquetes = 0;
        this.venta.valorPaquete = 0;
        this.venta.totalVenta = 0;
        this.venta.clienteId = 0;
        
        this.formGroup = this.formBuilder.group({
            //ventaId: [this.venta.ventaId, Validators.required],
            fecha: [this.venta.fecha, Validators.required],
            clienteId : [this.venta.clienteId , [Validators.required, ]],
            clienteNombre: [''],
            clienteApellido: [''],
            numeroPaquetes : [this.venta.numeroPaquetes ,[Validators.required,  Validators.min(1) ]],
            valorPaquete : [this.venta.valorPaquete , [Validators.required,  Validators.min(1) ]],
             totalVenta : [this.venta.totalVenta , Validators.required]
            
        });
      }
    get control() { 
      return this.formGroup.controls;
    }
    //buscar el cliente 
    buscarCliente() {
      this.clienteService.getId(this.formGroup.value.clienteId).subscribe(cliente => {
          if (cliente != null) {
              this.control['clienteId'].setValue(cliente.clienteId);
              this.control['clienteNombre'].setValue(cliente.nombre);
              this.control['clienteApellido'].setValue(cliente.apellido);
          }
          else
          {
              this.openModalCliente();
          }
      });
  }

  //Manejo Modal
  openModalCliente()
  {
      this.modalService.open(ClienteConsultaModalComponent, { size: 'lg' }).result.then((cliente) => this.actualizar(cliente));
  }

  actualizar(cliente: Cliente) {
      
      this.control['clienteId'].setValue(cliente.clienteId);
      this.control['clienteNombre'].setValue(cliente.nombre);
      this.control['clienteApellido'].setValue(cliente.apellido);
  }
  //Fin Manejo Modal
    onSubmit() {
      this.submitted = true;
       if (this.formGroup.invalid) {
          return;
       }
       this.add();
       this.formGroup.reset();
    }
    //calcula el total de la venta para ser mostrada en el formulario
   ventaTotal(){
    this.venta.totalVenta =this.formGroup.controls.numeroPaquetes.value*this.formGroup.controls.valorPaquete.value;
   }   
      

  add() {
    this.venta= this.formGroup.value;
    this.ventaService.post(this.venta).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Venta Registrada!!! :-)';

        // alert('Cliente Registrado!');
        this.venta = p;
      }
    });
    
  }

}
