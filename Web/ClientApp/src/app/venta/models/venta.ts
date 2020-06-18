import { DetalleVenta } from "./detalle-venta";

export class Venta {
    fecha: Date;
    estado: string;
    total: number;
    Detalles: DetalleVenta[]; 
    clienteId: number;  
}
