import { Component, OnInit } from '@angular/core';
import { VentaViewModel } from '../models/venta-view-model';
import { VentaService } from 'src/app/services/venta.service';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-venta-consulta',
  templateUrl: './venta-consulta.component.html',
  styleUrls: ['./venta-consulta.component.css']
})
export class VentaConsultaComponent implements OnInit {
  ventaViewModels: VentaViewModel[];
  constructor(private ventaService: VentaService, private signalRService: SignalRService) { }

  ngOnInit() {
    this.ventaService.get().subscribe(result => {
      this.ventaViewModels = result;
    });

    ///Se suscribe al servicio de signal r y cuando se regustr una nueva persona se agregará el registro nuevo al array personas
    /* this.signalRService.ventaReceived.subscribe((ventaViewModels: VentaViewModel) => {
      this.ventaViewModels.push(ventaViewModels);
    }); */
  }

}
