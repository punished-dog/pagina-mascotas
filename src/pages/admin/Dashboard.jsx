import { Link } from "react-router-dom";
import TarjetaResumen from "../../components/admin/TarjetaResumen";
import { listarOrdenes } from "../../data/ordenes";
import { listarProductos, productosCriticos } from "../../data/productos";
import { listarUsuarios } from "../../data/usuarios";
import { useSesion } from "../../context/SesionContext";
import { resumenVentas } from "../../utils/reportes";
import { formatoFecha, formatoPrecio } from "../../utils/formato";

export default function Dashboard() {
  const { usuario, esAdmin } = useSesion();
  const ordenes = listarOrdenes();
  const resumen = resumenVentas(ordenes);
  const criticos = productosCriticos();
  const ultimas = [...ordenes].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 5);

  return (
    <>
      <h1 className="h3 mb-1">Hola, {usuario.nombre}</h1>
      <p className="text-secondary mb-4">Resumen de lo que esta pasando en la tienda.</p>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <TarjetaResumen titulo="Ventas" valor={formatoPrecio(resumen.total)} icono="bi-cash-coin" color="success" detalle={"Promedio " + formatoPrecio(resumen.promedio)} />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <TarjetaResumen titulo="Ordenes pagadas" valor={resumen.pagadas} icono="bi-receipt" color="primary" detalle={resumen.rechazadas + " rechazadas"} />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <TarjetaResumen titulo="Productos" valor={listarProductos().length} icono="bi-box-seam" color="warning" detalle={criticos.length + " con stock critico"} />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <TarjetaResumen titulo="Usuarios" valor={listarUsuarios().length} icono="bi-people" color="info" />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-7">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h2 className="h6 mb-0">Ultimas ordenes</h2>
              <Link className="small" to="/admin/ordenes">Ver todas</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha</th>
                    <th scope="col" className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimas.map((o) => (
                    <tr key={o.id}>
                      <td><Link to={"/admin/ordenes/" + o.id}>{o.id}</Link></td>
                      <td>{o.cliente.nombre} {o.cliente.apellidos}</td>
                      <td className="small">{formatoFecha(o.fecha)}</td>
                      <td className="text-end">
                        {formatoPrecio(o.total)}
                        {o.estado !== "Pagada" && <span className="badge text-bg-danger ms-2">{o.estado}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h2 className="h6 mb-0">Stock critico</h2>
              <Link className="small" to="/admin/productos/criticos">Ver detalle</Link>
            </div>
            <ul className="list-group list-group-flush">
              {criticos.length === 0 && (
                <li className="list-group-item text-secondary">No hay productos con stock critico.</li>
              )}
              {criticos.map((p) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={p.id}>
                  {p.nombre}
                  <span className="badge text-bg-danger">{p.stock} un.</span>
                </li>
              ))}
            </ul>
            {esAdmin && (
              <div className="card-footer bg-white d-flex flex-wrap gap-2 mt-auto">
                <Link className="btn btn-sm btn-primary" to="/admin/productos/nuevo"><i className="bi bi-plus-lg me-1"></i>Nuevo producto</Link>
                <Link className="btn btn-sm btn-outline-primary" to="/admin/usuarios/nuevo"><i className="bi bi-person-plus me-1"></i>Nuevo usuario</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
