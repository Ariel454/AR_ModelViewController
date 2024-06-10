export interface Invoice {
  id: number;
  codigo: string;
  user_id: number;
  fecha: string;
  precio: number;
  estado: Status;
}

export enum Status {
  APROBADO = "APROBADO",
  PENDIENTE = "PENDIENTE",
  DENEGADO = "DENEGADO",
}
