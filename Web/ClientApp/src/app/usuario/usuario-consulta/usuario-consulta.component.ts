import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-usuario-consulta',
  templateUrl: './usuario-consulta.component.html',
  styleUrls: ['./usuario-consulta.component.css']
})
export class UsuarioConsultaComponent implements OnInit {
  usuarios: Usuario[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.get().subscribe(result => {
     this.usuarios = result;
   }); 
 }

}
