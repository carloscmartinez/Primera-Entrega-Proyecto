import { Component, OnInit } from '@angular/core';
import { VentaViewModel } from '../models/venta-view-model';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta-consulta',
  templateUrl: './venta-consulta.component.html',
  styleUrls: ['./venta-consulta.component.css']
})
export class VentaConsultaComponent implements OnInit {
  ventaViewModels: VentaViewModel[];
  constructor(private ventaService: VentaService) { }

  ngOnInit() {
    this.ventaService.get().subscribe(result => {
      this.ventaViewModels = result;
    });
  }

}
