import { Component, OnInit } from '@angular/core';
import { Venta } from '../models/venta';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { VentaService } from 'src/app/services/venta.service';

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
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
        this.venta= new Venta();
        let myDate = new Date();
        this.venta.ventaId = '';
        this.venta.fecha = myDate;
        this.venta.numeroPaquetes = 0;
        this.venta.valorPaquete = 0;
        this.venta.totalVenta = 0;
        this.venta.clienteId = '';
        
        this.formGroup = this.formBuilder.group({
            ventaId: [this.venta.ventaId, Validators.required],
            fecha: [this.venta.fecha, Validators.required],
            clienteId : [this.venta.clienteId , Validators.required],
            numeroPaquetes : [this.venta.numeroPaquetes , Validators.required],
            valorPaquete : [this.venta.valorPaquete , Validators.required],
             totalVenta : [this.venta.totalVenta , Validators.required]
            
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
      
   ventaTotal(){
    // venta.totalVenta=this.formBuilder.group.ventaId.value; this.venta.numeroPaquetes*this.venta.valorPaquete;
    //this.formBuilder.control.
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
