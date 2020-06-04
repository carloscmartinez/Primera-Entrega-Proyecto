import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';
import { tap, catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {
  formGroup: FormGroup;
 usuario:  Usuario;
  submitted= false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
        this.usuario = new Usuario();
        this.usuario.usuario= '';
        this.usuario.password= '';
        this.usuario.estado= '';
        this.usuario.nombre = '';
        this.usuario.apellido= '';
        this.usuario.role= '';
        this.usuario.telefono = '';
        
        this.formGroup = this.formBuilder.group({
          usuario: [this.usuario.usuario, Validators.required],
          password: [this.usuario.password, Validators.required],
          estado: [this.usuario.estado, Validators.required],
          nombre: [this.usuario.nombre, Validators.required],
          apellido: [this.usuario.apellido, Validators.required],
          role: [this.usuario.role, Validators.required],
          telefono : [this.usuario.telefono, Validators.required]
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
    this.usuario= this.formGroup.value;
    this.userService.post(this.usuario).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Usuario Registrado!!! :-)';
        this.usuario = p;
      }
    });    
  }

  onReset() {
    this.submitted = false;
    this.formGroup.reset();
  }

}
