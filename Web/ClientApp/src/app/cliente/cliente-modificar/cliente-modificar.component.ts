import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Cliente } from '../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-modificar',
  templateUrl: './cliente-modificar.component.html',
  styleUrls: ['./cliente-modificar.component.css']
})
export class ClienteModificarComponent implements OnInit {
  cliente:Cliente;
  stask:string;
  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private location: Location
  ) { }

  ngOnInit() {
     this.get();
  }

  get(): void {
    // this.clienteService.getId(cliente.clienteId).subscribe(result => {
    //   this.cliente = result}); 
    const id = +this.route.snapshot.paramMap.get('id');
    this.clienteService.getId(id)
    .subscribe(hero => this.cliente = hero);
    }
    update(): void {
    this.clienteService.update(this.cliente)
    .subscribe(() => this.goBack());
    }
    delete(): void {
    this.clienteService.delete(this.cliente)
    .subscribe(() => this.goBack());
    }
    goBack(): void {
    this.location.back();
    }

}
/////////////////






