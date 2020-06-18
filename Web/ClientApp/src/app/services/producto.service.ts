import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of, observable } from 'rxjs';
import { Producto } from '../producto/models/producto';

const httpOptions = {
  headers: new HttpHeaders ({ 'Content-Type': 'application/json'})
  };

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService)
  {
      this.baseUrl = baseUrl;
  }

  get(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl + 'api/Producto')
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Producto[]>('Consulta Producto', null))
        );
  }

  post(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.baseUrl + 'api/Producto', producto)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Producto>('Registrar Producto', null))
        );
}

getId(id: number): Observable<Producto>
{
  const url = `${this.baseUrl + 'api/Producto'}/${id}`;  
  return this.http.get<Producto>(url).pipe(
    tap(_ => this.handleErrorService.log('datos enviados')),
    catchError(this.handleErrorService.handleError<Producto>(`getProducto id=${id}`))
      );
 
  }

  update (producto: Producto): Observable<any> {
    const url = `${this.baseUrl +'api/Producto'}/${producto.productoId}`;
    return this.http.put(url, producto, httpOptions).pipe(
      tap(_ => this.handleErrorService.log(`Actualizado producto id=${producto.productoId}`)),
      catchError(this.handleErrorService.handleError<any>('producto'))
        );   
    }
}
