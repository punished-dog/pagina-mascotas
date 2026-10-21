import { Link, useParams } from "react-router-dom";
import { obtenerProducto } from "../../data/productos";
import { listarOrdenes } from "../../data/ordenes";
import { ventasPorProducto } from "../../utils/reportes";
import { useSesion } from "../../context/SesionContext";
import { formatoPrecio, precioFinal } from "../../utils/formato";

export default function VerProducto() {
  const { id } = useParams();
  const { esAdmin } = useSesion();
  const producto = obtenerProducto(id);

  if (producto === null) {
    return (
      <div className="alert alert-warning">
        No existe el producto. <Link to="/admin/productos">Volver a productos</Link>
      </div>
    );
  }

  const ventas = ventasPorProducto(listarOrdenes(), [producto])[0];
  const critico = producto.stock <= producto.stockCritico;

  return (
    <>
      <Link className="small" to="/admin/productos"><i className="bi bi-arrow-left me-1"></i>Volver a productos</Link>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2 mb-3">
        <h1 className="h3 mb-0">{producto.nombre}</h1>
        {esAdmin && (
          <Link className="btn btn-sm btn-primary" to={"/admin/productos/" + producto.id + "/editar"}>
            <i className="bi bi-pencil me-1"></i>Editar
          </Link>
        )}
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 p-3 text-center">
            <img className="img-fluid" src={producto.imagen} alt={producto.nombre} style={{ maxHeight: "260px", objectFit: "contain" }} />
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <dl className="row mb-0">
                <dt className="col-5 col-lg-3">Codigo</dt>
                <dd className="col-7 col-lg-9">{producto.codigo}</dd>
                <dt className="col-5 col-lg-3">Categoria</dt>
                <dd className="col-7 col-lg-9">{producto.categoria}</dd>
                <dt className="col-5 col-lg-3">Precio</dt>
                <dd className="col-7 col-lg-9">{formatoPrecio(producto.precio)}</dd>
                <dt className="col-5 col-lg-3">Oferta</dt>
                <dd className="col-7 col-lg-9">
                  {producto.oferta > 0 ? producto.oferta + "% (queda en " + formatoPrecio(precioFinal(producto)) + ")" : "Sin oferta"}
                </dd>
                <dt className="col-5 col-lg-3">Stock</dt>
                <dd className="col-7 col-lg-9">
                  {producto.stock} unidades
                  {critico && <span className="badge text-bg-danger ms-2">Stock critico</span>}
                </dd>
                <dt className="col-5 col-lg-3">Stock critico</dt>
                <dd className="col-7 col-lg-9">{producto.stockCritico}</dd>
                <dt className="col-5 col-lg-3">Vendidos</dt>
                <dd className="col-7 col-lg-9">{ventas.unidades} unidades ({formatoPrecio(ventas.ingresos)})</dd>
                <dt className="col-5 col-lg-3">Descripcion</dt>
                <dd className="col-7 col-lg-9 mb-0">{producto.descripcion || "Sin descripcion"}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
