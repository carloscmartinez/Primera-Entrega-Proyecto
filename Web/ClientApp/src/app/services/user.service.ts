import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of, observable } from 'rxjs';
import { Usuario } from '../usuario/models/usuario';

const httpOptions = {
  headers: new HttpHeaders ({ 'Content-Type': 'application/json'})
  };
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService)
  {
      this.baseUrl = baseUrl;
  }

  get(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl + 'api/User')
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Usuario[]>('Consulta Usuario', null))
        );
  }

  post(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl + 'api/User', usuario)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Usuario>('Registrar Usuario', null))
        );
}

getId(id: number): Observable<Usuario>
{
  const url = `${this.baseUrl + 'api/User'}/${id}`;  
  return this.http.get<Usuario>(url).pipe(
    tap(_ => this.handleErrorService.log('datos enviados')),
    catchError(this.handleErrorService.handleError<Usuario>(`getUsuario id=${id}`))
      );
 
  }

  update (usuario: Usuario): Observable<any> {
    const url = `${this.baseUrl +'api/User'}/${usuario.usuarioId}`;
    return this.http.put(url, usuario, httpOptions).pipe(
      tap(_ => this.handleErrorService.log(`Actualizado usuario id=${usuario.usuarioId}`)),
      catchError(this.handleErrorService.handleError<any>('usuario'))
        );   
    }

    delete (usuario: Usuario | number): Observable<Usuario> {
      const id = typeof usuario === 'number'? usuario : usuario.usuarioId;
      const url = `${this.baseUrl +'api/User'}/${id}`;
      return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => this.handleErrorService.log(`Usuario eliminado id=${id}`)),
      catchError(this.handleErrorService.handleError<Usuario>('Usuario Eliminado'))
      );
      }
}
