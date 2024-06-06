import React, { useState } from "react";

const FacturaForm: React.FC = () => {
  const [codigoProducto, setCodigoProducto] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [puntos, setPuntos] = useState<number | null>(null);

  const factorConversion = 0.05;
  const bonificacionFrecuencia = 0.003; // 0.3% increment per purchase per week

  const handleIngresarFactura = () => {
    // Supongamos que esta es la cantidad de compras en una semana (este valor debería ser obtenido dinámicamente)
    const comprasSemanales = 3;

    // Cálculo de puntos
    const puntosObtenidos =
      valorTotal *
      (factorConversion + bonificacionFrecuencia * comprasSemanales);
    setPuntos(puntosObtenidos);
  };

  return (
    <div>
      <form>
        <div>
          <label>Código Producto:</label>
          <input
            type="text"
            value={codigoProducto}
            onChange={(e) => setCodigoProducto(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label>Valor Total:</label>
          <input
            type="number"
            value={valorTotal}
            onChange={(e) => setValorTotal(parseFloat(e.target.value))}
          />
        </div>
        <button type="button" onClick={handleIngresarFactura}>
          Ingresar Factura
        </button>
      </form>
      {puntos !== null && (
        <div>
          <h3>Puntos Obtenidos: {puntos.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default FacturaForm;
