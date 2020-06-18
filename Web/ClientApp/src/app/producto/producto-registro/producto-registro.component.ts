import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';
import { Producto } from '../models/producto';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-producto-registro',
  templateUrl: './producto-registro.component.html',
  styleUrls: ['./producto-registro.component.css']
})
export class ProductoRegistroComponent implements OnInit {
  formGroup: FormGroup;
  producto:  Producto;
  submitted= false;

  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
        this.producto = new Producto();
        this.producto.nombre= '';
        this.producto.precio= 0;
        
        this.formGroup = this.formBuilder.group({
          nombre: [this.producto.nombre, Validators.required],
          precio: [this.producto.precio, Validators.required]
        });
      }

    get control() { 
      return this.formGroup.controls;
    }

    onSubmit() {
      this.submitted = true;
       if (this.formGroup.invalid) {
          return;
       }
       this.add();
       this.formGroup.reset();
    }

    add() {
      this.producto= this.formGroup.value;
      this.productoService.post(this.producto).subscribe(p => {
        if (p != null) {
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "Resultado Operación";
          messageBox.componentInstance.message = 'Producto Registrado!!! :-)';
          this.producto = p;
        }
      });    
    }
  
    onReset() {
      this.submitted = false;
      this.formGroup.reset();
    }

}
