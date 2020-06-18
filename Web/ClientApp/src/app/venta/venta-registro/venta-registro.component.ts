import { Component, OnInit } from '@angular/core';
import { Venta } from '../models/venta';
import { DetalleVenta } from '../models/detalle-venta';
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
  detallesVenta: DetalleVenta[];
  //detallesfVenta = new DetalleVenta[];
  detalleVenta: DetalleVenta;
  formGroup: FormGroup;
  formGroupDetalle: FormGroup;
  submitted= false
 ventaTotal:number;

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
        this.detalleVenta= new DetalleVenta();
        let myDate = new Date();
        this.detallesVenta = [];       
        this.venta.fecha = myDate;
        this.venta.estado= "";
        this.venta.total= 0;
        this.venta.clienteId = 0;
        this.ventaTotal=0;
        this.detalleVenta.productoId= 0;
        this.detalleVenta.cantidad= 0;
        this.detalleVenta.precio= 0;
        this.detalleVenta.totalVenta= 0;



        
        this.formGroup = this.formBuilder.group({
            //ventaId: [this.venta.ventaId, Validators.required],
            fecha: [this.venta.fecha, Validators.required],
            clienteId : [this.venta.clienteId , [Validators.required, ]],
            clienteNombre: [''],
            clienteApellido: [''],
            estado: [this.venta.estado,[Validators.required,  ]],
            // total: [this.venta.total, [Validators.required,  Validators.min(1) ]],
        });

    this.formGroupDetalle = this.formBuilder.group({
      productoId: [this.detalleVenta.productoId, Validators.required],
      cantidad: [this.detalleVenta.cantidad, Validators.required],
      precio: [this.detalleVenta.precio, Validators.required],
      totalVenta: [this.detalleVenta.totalVenta, Validators.required],
    });
      }
    get control() { 
      return this.formGroup.controls;
      
    }
    get controlDetalle() { 
      
      return this.formGroupDetalle.controls;
    }
    agregarDetalle(){
      let detalle = new DetalleVenta();
      detalle.cantidad = this.formGroupDetalle.value.cantidad;
      detalle.precio= this.formGroupDetalle.value.precio; 
      detalle.totalVenta= this.formGroupDetalle.value.totalVenta; 
      detalle.productoId= this.formGroupDetalle.value.productoId;
      this.detallesVenta.push(detalle);
      this.ventaTotal=this.ventaTotal+detalle.totalVenta;
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
  //  ventaTotal(){
  //   this.venta.totalVenta =this.formGroup.controls.numeroPaquetes.value*this.formGroup.controls.valorPaquete.value;
  //  }   
      

  add() {
    this.venta= this.formGroup.value;
    this.venta.total= this.ventaTotal;
    this.venta.Detalles= this.detallesVenta;
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
