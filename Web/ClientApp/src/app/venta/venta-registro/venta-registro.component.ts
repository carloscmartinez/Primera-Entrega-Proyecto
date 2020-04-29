import { Component, OnInit } from '@angular/core';
import { Venta } from '../models/venta';

@Component({
  selector: 'app-venta-registro',
  templateUrl: './venta-registro.component.html',
  styleUrls: ['./venta-registro.component.css']
})
export class VentaRegistroComponent implements OnInit {
  venta: Venta;
  constructor() { }

  ngOnInit() {
    this.venta = new Venta();
  }

}
