import { Claim } from "./claim";
import { Invoice } from "./invoice";

export interface User {
  id: number;
  name: string;
  rol: string;
  codigo: string;
  cedula: string;
  email: string;
  password: string;
  direccion: string;
  puntos: number;
  reclamos: Claim[];
  facturas: Invoice[];
}
