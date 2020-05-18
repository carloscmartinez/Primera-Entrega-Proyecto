import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Venta } from '../venta/models/venta';
import { VentaViewModel } from '../venta/models/venta-view-model';


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService)
  {
      this.baseUrl = baseUrl;
  }

  get(): Observable<VentaViewModel[]> {
    return this.http.get<VentaViewModel[]>(this.baseUrl + 'api/Venta')
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<VentaViewModel[]>('Consulta Venta', null))
        );
  }

  post(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.baseUrl + 'api/Venta', venta)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Venta>('Registrar Venta', null))
        );
}
}
