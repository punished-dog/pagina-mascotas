import { useState } from "react";
import { Link } from "react-router-dom";
import { listarProductos } from "../../data/productos";
import { listarOrdenes } from "../../data/ordenes";
import { ventasPorProducto, convertirCsv, descargarCsv } from "../../utils/reportes";
import { formatoPrecio } from "../../utils/formato";

const columnas = [
  { campo: "codigo", titulo: "Codigo" },
  { campo: "nombre", titulo: "Producto" },
  { campo: "categoria", titulo: "Categoria" },
  { campo: "stock", titulo: "Stock" },
  { campo: "unidades", titulo: "Unidades vendidas" },
  { campo: "ingresos", titulo: "Ingresos" }
];

export default function ReporteProductos() {
  const [soloCriticos, setSoloCriticos] = useState(false);
  const filas = ventasPorProducto(listarOrdenes(), listarProductos());
  const visibles = soloCriticos ? filas.filter((f) => f.critico) : filas;
  const totalUnidades = visibles.reduce((suma, f) => suma + f.unidades, 0);
  const totalIngresos = visibles.reduce((suma, f) => suma + f.ingresos, 0);

  return (
    <>
      <Link className="small" to="/admin/productos"><i className="bi bi-arrow-left me-1"></i>Volver a productos</Link>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2 mb-3">
        <h1 className="h3 mb-0">Reporte de productos</h1>
        <button className="btn btn-sm btn-outline-success" type="button" onClick={() => descargarCsv("reporte-productos.csv", convertirCsv(visibles, columnas))}>
          <i className="bi bi-download me-1"></i>Descargar CSV
        </button>
      </div>

      <div className="form-check form-switch mb-3">
        <input className="form-check-input" type="checkbox" role="switch" id="soloCriticos" checked={soloCriticos} onChange={(e) => setSoloCriticos(e.target.checked)} />
        <label className="form-check-label" htmlFor="soloCriticos">Mostrar solo productos con stock critico</label>
      </div>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Codigo</th>
                <th scope="col">Producto</th>
                <th scope="col">Categoria</th>
                <th scope="col" className="text-center">Stock</th>
                <th scope="col" className="text-center">Vendidos</th>
                <th scope="col" className="text-end">Ingresos</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((f) => (
                <tr key={f.id} className={f.critico ? "table-danger" : ""}>
                  <td className="small">{f.codigo}</td>
                  <td>{f.nombre}</td>
                  <td>{f.categoria}</td>
                  <td className="text-center">{f.stock}</td>
                  <td className="text-center">{f.unidades}</td>
                  <td className="text-end">{formatoPrecio(f.ingresos)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="table-light fw-bold">
              <tr>
                <td colSpan="4">Total</td>
                <td className="text-center">{totalUnidades}</td>
                <td className="text-end">{formatoPrecio(totalIngresos)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <p className="small text-secondary mt-2">Solo se cuentan las ordenes pagadas. Las filas en rojo tienen stock critico.</p>
    </>
  );
}
