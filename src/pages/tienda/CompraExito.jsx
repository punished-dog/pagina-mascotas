import { Link, useParams } from "react-router-dom";
import Boleta from "../../components/Boleta";
import { obtenerOrden } from "../../data/ordenes";

export default function CompraExito() {
  const { id } = useParams();
  const orden = obtenerOrden(id);

  if (orden === null || orden.estado !== "Pagada") {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3">No encontramos esa compra</h1>
        <Link className="btn btn-primary mt-2" to="/">Volver al inicio</Link>
      </section>
    );
  }

  return (
    <section className="container py-4" style={{ maxWidth: "860px" }}>
      <div className="alert alert-success d-flex align-items-center gap-3">
        <i className="bi bi-check-circle-fill fs-2"></i>
        <div>
          <h1 className="h4 mb-1">¡Pago realizado con exito!</h1>
          <p className="mb-0">
            Gracias por tu compra, {orden.cliente.nombre}. Te enviamos el detalle a {orden.cliente.correo}.
          </p>
        </div>
      </div>

      <Boleta orden={orden} />

      <div className="d-flex flex-wrap gap-2 justify-content-end mt-3 no-imprimir">
        <button className="btn btn-outline-secondary" type="button" onClick={() => window.print()}>
          <i className="bi bi-printer me-1"></i>Imprimir boleta
        </button>
        <Link className="btn btn-primary" to="/productos">Seguir comprando</Link>
      </div>
    </section>
  );
}
