import { useState } from "react";
import { Link } from "react-router-dom";
import { listarOrdenes } from "../../data/ordenes";
import { formatoFecha, formatoPrecio } from "../../utils/formato";

export default function OrdenesAdmin() {
  const [texto, setTexto] = useState("");
  const [estado, setEstado] = useState("");
  const buscado = texto.trim().toLowerCase();

  const ordenes = listarOrdenes()
    .filter((o) => estado === "" || o.estado === estado)
    .filter(
      (o) =>
        buscado === "" ||
        String(o.id).includes(buscado) ||
        (o.cliente.nombre + " " + o.cliente.apellidos).toLowerCase().includes(buscado) ||
        o.cliente.correo.toLowerCase().includes(buscado)
    )
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <>
      <h1 className="h3 mb-3">Ordenes y boletas</h1>

      <div className="card shadow-sm border-0">
        <div className="card-body row g-2">
          <div className="col-12 col-md-8">
            <input
              className="form-control"
              type="search"
              placeholder="Buscar por numero, cliente o correo"
              aria-label="Buscar orden"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4">
            <select className="form-select" aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              <option value="Pagada">Pagadas</option>
              <option value="Rechazada">Rechazadas</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Fecha</th>
                <th scope="col">Cliente</th>
                <th scope="col" className="text-center">Productos</th>
                <th scope="col" className="text-end">Total</th>
                <th scope="col" className="text-center">Estado</th>
                <th scope="col" className="text-end">Boleta</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-secondary py-4">No hay ordenes que coincidan.</td>
                </tr>
              )}
              {ordenes.map((o) => (
                <tr key={o.id}>
                  <td className="fw-semibold">{o.id}</td>
                  <td className="small">{formatoFecha(o.fecha)}</td>
                  <td>
                    {o.cliente.nombre} {o.cliente.apellidos}
                    <div className="small text-secondary">{o.cliente.correo}</div>
                  </td>
                  <td className="text-center">{o.items.reduce((suma, i) => suma + i.cantidad, 0)}</td>
                  <td className="text-end">{formatoPrecio(o.total)}</td>
                  <td className="text-center">
                    <span className={"badge " + (o.estado === "Pagada" ? "text-bg-success" : "text-bg-danger")}>{o.estado}</span>
                  </td>
                  <td className="text-end">
                    <Link className="btn btn-sm btn-outline-secondary" to={"/admin/ordenes/" + o.id}>
                      <i className="bi bi-file-earmark-text me-1"></i>Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
