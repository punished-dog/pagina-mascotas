import { Link, useParams } from "react-router-dom";
import Boleta from "../../components/Boleta";
import { obtenerOrden } from "../../data/ordenes";

export default function CompraError() {
  const { id } = useParams();
  const orden = obtenerOrden(id);

  return (
    <section className="container py-4" style={{ maxWidth: "860px" }}>
      <div className="alert alert-danger d-flex align-items-center gap-3">
        <i className="bi bi-x-circle-fill fs-2"></i>
        <div>
          <h1 className="h4 mb-1">No se pudo realizar el pago</h1>
          <p className="mb-0">
            El banco rechazo la transaccion{orden !== null ? " de la orden N° " + orden.id : ""}. No se hizo ningun cargo
            y tus productos siguen en el carrito.
          </p>
        </div>
      </div>

      {orden !== null && <Boleta orden={orden} />}

      <div className="d-flex flex-wrap gap-2 justify-content-end mt-3">
        <Link className="btn btn-outline-secondary" to="/carrito">Volver al carrito</Link>
        <Link className="btn btn-primary" to="/checkout">
          <i className="bi bi-arrow-repeat me-1"></i>Volver a intentar el pago
        </Link>
      </div>
    </section>
  );
}
