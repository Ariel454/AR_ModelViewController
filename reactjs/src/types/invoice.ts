export interface Invoice {
  id: number;
  codigo: string;
  user_id: number;
  fecha: string;
  precio: number;
  estado: Status;
}

enum Status {
  ACTIVO = "ACTIVO",
  PENDIENTE = "PENDIENTE",
  DENEGADO = "DENEGADO",
}
