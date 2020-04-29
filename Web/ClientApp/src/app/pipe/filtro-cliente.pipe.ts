import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../cliente/models/cliente';

@Pipe({
  name: 'filtroCliente'
})
export class FiltroClientePipe implements PipeTransform {

  transform(clientes: Cliente[], searchText: string): any {

    if (searchText == null) return clientes;
    return clientes.filter(p => p.nombre.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

}
