import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../cliente/models/cliente';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of, observable } from 'rxjs';

const httpOptions = {
headers: new HttpHeaders ({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService)
  {
      this.baseUrl = baseUrl;
  }

  get(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl + 'api/Cliente')
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Cliente[]>('Consulta Cliente', null))
        );
  }

  post(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl + 'api/Cliente', cliente)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Cliente>('Registrar Cliente', null))
        );
}

getId(id: number): Observable<Cliente>
{
  const url = `${this.baseUrl + 'api/Cliente'}/${id}`;  
  return this.http.get<Cliente>(url).pipe(
    tap(_ => this.handleErrorService.log('datos enviados')),
    catchError(this.handleErrorService.handleError<Cliente>(`getCliente id=${id}`))
      );
 
  }

  update (cliente: Cliente): Observable<any> {
    const url = `${this.baseUrl +'api/Cliente'}/${cliente.clienteId}`;
    return this.http.put(url, cliente, httpOptions).pipe(
      tap(_ => this.handleErrorService.log(`Actualizado cliente id=${cliente.clienteId}`)),
      catchError(this.handleErrorService.handleError<any>('cliente'))
        );   
    }

    delete (cliente: Cliente | number): Observable<Cliente> {
      const id = typeof cliente === 'number'? cliente : cliente.clienteId;
      const url = `${this.baseUrl +'api/Cliente'}/${id}`;
      return this.http.delete<Cliente>(url, httpOptions).pipe(
      tap(_ => this.handleErrorService.log(`Cliente eliminado id=${id}`)),
      catchError(this.handleErrorService.handleError<Cliente>('Cliente Eliminado'))
      );
      }
}
