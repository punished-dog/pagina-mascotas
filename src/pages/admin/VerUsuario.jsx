import { Link, useParams } from "react-router-dom";
import { obtenerUsuario } from "../../data/usuarios";
import { ordenesDeCliente } from "../../data/ordenes";
import { resumenVentas } from "../../utils/reportes";
import { formatoFecha, formatoPrecio } from "../../utils/formato";

export default function VerUsuario() {
  const { run } = useParams();
  const usuario = obtenerUsuario(run);

  if (usuario === null) {
    return (
      <div className="alert alert-warning">
        No existe el usuario. <Link to="/admin/usuarios">Volver a usuarios</Link>
      </div>
    );
  }

  const compras = ordenesDeCliente(usuario.correo).sort((a, b) => b.fecha.localeCompare(a.fecha));
  const resumen = resumenVentas(compras);

  return (
    <>
      <Link className="small" to="/admin/usuarios"><i className="bi bi-arrow-left me-1"></i>Volver a usuarios</Link>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2 mb-3">
        <h1 className="h3 mb-0">{usuario.nombre} {usuario.apellidos}</h1>
        <Link className="btn btn-sm btn-primary" to={"/admin/usuarios/" + usuario.run + "/editar"}>
          <i className="bi bi-pencil me-1"></i>Editar
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h6 text-secondary text-uppercase">Datos</h2>
              <dl className="mb-0">
                <dt className="small text-secondary fw-normal">Run</dt>
                <dd>{usuario.run}</dd>
                <dt className="small text-secondary fw-normal">Correo</dt>
                <dd>{usuario.correo}</dd>
                <dt className="small text-secondary fw-normal">Tipo</dt>
                <dd>{usuario.tipo}</dd>
                <dt className="small text-secondary fw-normal">Fecha de nacimiento</dt>
                <dd>{usuario.fechaNacimiento || "No informada"}</dd>
                <dt className="small text-secondary fw-normal">Direccion</dt>
                <dd className="mb-0">
                  {usuario.direccion || "No informada"}
                  {usuario.comuna && <div className="small text-secondary">{usuario.comuna}, {usuario.region}</div>}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white">
              <h2 className="h6 mb-0">Historial de compras</h2>
            </div>
            <div className="card-body d-flex flex-wrap gap-4 border-bottom">
              <div>
                <p className="small text-secondary mb-0">Compras pagadas</p>
                <p className="h5 mb-0">{resumen.pagadas}</p>
              </div>
              <div>
                <p className="small text-secondary mb-0">Total gastado</p>
                <p className="h5 mb-0">{formatoPrecio(resumen.total)}</p>
              </div>
              <div>
                <p className="small text-secondary mb-0">Pagos rechazados</p>
                <p className="h5 mb-0">{resumen.rechazadas}</p>
              </div>
            </div>
            {compras.length === 0 ? (
              <p className="text-secondary p-3 mb-0">Este usuario todavia no tiene compras.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">N°</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Productos</th>
                      <th scope="col" className="text-end">Total</th>
                      <th scope="col" className="text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compras.map((o) => (
                      <tr key={o.id}>
                        <td><Link to={"/admin/ordenes/" + o.id}>{o.id}</Link></td>
                        <td className="small">{formatoFecha(o.fecha)}</td>
                        <td className="small">{o.items.map((i) => i.cantidad + " x " + i.nombre).join(", ")}</td>
                        <td className="text-end">{formatoPrecio(o.total)}</td>
                        <td className="text-center">
                          <span className={"badge " + (o.estado === "Pagada" ? "text-bg-success" : "text-bg-danger")}>{o.estado}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
