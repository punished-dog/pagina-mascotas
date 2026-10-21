import { Link } from "react-router-dom";
import { productosCriticos } from "../../data/productos";
import { useSesion } from "../../context/SesionContext";

export default function ProductosCriticos() {
  const { esAdmin } = useSesion();
  const criticos = productosCriticos().sort((a, b) => a.stock - b.stock);

  return (
    <>
      <Link className="small" to="/admin/productos"><i className="bi bi-arrow-left me-1"></i>Volver a productos</Link>
      <h1 className="h3 mt-2 mb-1">Productos criticos</h1>
      <p className="text-secondary">Productos con stock igual o menor a su stock critico. Hay que reponerlos pronto.</p>

      {criticos.length === 0 ? (
        <div className="alert alert-success">Todos los productos tienen stock suficiente.</div>
      ) : (
        <div className="row g-3">
          {criticos.map((p) => (
            <div className="col-12 col-md-6 col-xl-4" key={p.id}>
              <div className="card shadow-sm border-0 border-start border-danger border-4 h-100">
                <div className="card-body d-flex gap-3 align-items-center">
                  <img src={p.imagen} alt="" width="64" height="64" style={{ objectFit: "contain" }} />
                  <div className="flex-grow-1">
                    <h2 className="h6 mb-1">{p.nombre}</h2>
                    <p className="small text-secondary mb-1">{p.codigo} · {p.categoria}</p>
                    <p className="mb-0">
                      <span className="badge text-bg-danger">{p.stock === 0 ? "Sin stock" : p.stock + " unidades"}</span>
                      <span className="small text-secondary ms-2">critico: {p.stockCritico}</span>
                    </p>
                  </div>
                  {esAdmin && (
                    <Link className="btn btn-sm btn-outline-primary" to={"/admin/productos/" + p.id + "/editar"}>Reponer</Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
