import { Link } from "react-router-dom";
import { formatoPrecio, precioFinal } from "../utils/formato";

export default function TarjetaProducto({ producto, onAgregar, textoBoton = "Añadir al carrito" }) {
  const sinStock = producto.stock <= 0;
  const precio = precioFinal(producto);
  const enlace = "/producto/" + producto.id;

  return (
    <div className="card h-100 shadow-sm tarjeta-producto">
      <Link to={enlace} className="position-relative bg-white rounded-top">
        <img src={producto.imagen} className="card-img-top p-3" alt={producto.nombre} />
        {producto.oferta > 0 && (
          <span className="badge text-bg-danger position-absolute top-0 start-0 m-2">
            -{producto.oferta}%
          </span>
        )}
      </Link>

      <div className="card-body d-flex flex-column">
        <small className="text-secondary">{producto.categoria}</small>
        <h3 className="h6 card-title">
          <Link className="link-dark link-underline-opacity-0" to={enlace}>{producto.nombre}</Link>
        </h3>

        <div className="mt-auto">
          <div className="d-flex flex-wrap align-items-baseline column-gap-2">
            {producto.oferta > 0 && (
              <small className="text-secondary text-decoration-line-through">
                {formatoPrecio(producto.precio)}
              </small>
            )}
            <span className="fw-bold fs-5 text-nowrap">{precio === 0 ? "Gratis" : formatoPrecio(precio)}</span>
          </div>

          {sinStock ? (
            <p className="text-danger small fw-semibold mb-0 mt-2">Sin stock</p>
          ) : (
            <button className="btn btn-primary btn-sm w-100 mt-2" type="button" onClick={() => onAgregar(producto)}>
              {textoBoton}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
