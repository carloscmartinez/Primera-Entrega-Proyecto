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
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/producto/models/producto';
import { DetalleVentaViewModel } from '../models/detalle-venta-view-model';

@Component({
  selector: 'app-venta-registro',
  templateUrl: './venta-registro.component.html',
  styleUrls: ['./venta-registro.component.css']
})
export class VentaRegistroComponent implements OnInit {
  venta: Venta;
  detallesVenta: DetalleVenta[];
  detallesVentaViews: DetalleVentaViewModel[];
  //detallesfVenta = new DetalleVenta[];
  detalleVenta: DetalleVenta;
  formGroup: FormGroup;
  formGroupDetalle: FormGroup;
  submitted= false
  ventaTotal:number;
  productos: Producto[];
  nombreProducto:string;

  constructor(
    private ventaService: VentaService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private productoService: ProductoService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.productoService.get().subscribe(result => {
    this.productos = result;});
  }

  private buildForm() {
        this.venta= new Venta();
        this.detalleVenta= new DetalleVenta();
        let myDate = new Date();
        this.detallesVenta = [];
        this.detallesVentaViews = [];       
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
      totalVenta: [''],
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
      
      //Detalles con nombre del producto para mostrar en la tabla
      let detalleView = new DetalleVentaViewModel();
      detalleView.cantidad = this.formGroupDetalle.value.cantidad;
      detalleView.precio= this.formGroupDetalle.value.precio; 
      detalleView.totalVenta= this.formGroupDetalle.value.totalVenta; 
      detalleView.productoId= this.formGroupDetalle.value.productoId;
      detalleView.nombreProducto= this.nombreProducto;
      this.detallesVentaViews.push(detalleView);
      this.formGroupDetalle.reset();
      this.nombreProducto='';
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
      // this.formGroup.reset();
    this.submitted = false;
    this.formGroup.reset();
    this.ventaTotal=0;
    this.detallesVenta=[];
    this.formGroupDetalle.reset();
    //this.onReset();
    }
    //calcula el total de la venta para ser mostrada en el formulario
   totalDetalleVenta(){
    var detalle =this.formGroupDetalle.controls.precio.value*this.formGroupDetalle.controls.cantidad.value;
    this.controlDetalle['totalVenta'].setValue(detalle);
   } 
   //pasa los valores del producto al detalle de venta  
   actualizaProducto(producto: Producto){
    
    this.controlDetalle['productoId'].setValue(producto.productoId);
    this.controlDetalle['precio'].setValue(producto.precio);
    this.nombreProducto=producto.nombre;
   } 
      

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

 /*  onReset() {
    this.submitted = false;
    this.formGroup.reset();
    this.ventaTotal=0;
    this.detallesVenta=[];
    this.formGroupDetalle.reset();
} */

}
