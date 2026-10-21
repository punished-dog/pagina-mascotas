import { Link, useParams } from "react-router-dom";
import Boleta from "../../components/Boleta";
import { obtenerOrden } from "../../data/ordenes";

export default function VerOrden() {
  const { id } = useParams();
  const orden = obtenerOrden(id);

  if (orden === null) {
    return (
      <div className="alert alert-warning">
        No existe la orden {id}. <Link to="/admin/ordenes">Volver a las ordenes</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px" }}>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 no-imprimir">
        <Link className="small" to="/admin/ordenes"><i className="bi bi-arrow-left me-1"></i>Volver a las ordenes</Link>
        <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => window.print()}>
          <i className="bi bi-printer me-1"></i>Imprimir boleta
        </button>
      </div>
      <Boleta orden={orden} />
    </div>
  );
}
