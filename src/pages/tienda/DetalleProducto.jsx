import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Contador from "../../components/Contador";
import ListaProductos from "../../components/ListaProductos";
import { obtenerProducto, productosPorCategoria } from "../../data/productos";
import { formatoPrecio, precioFinal } from "../../utils/formato";
import { useAgregarAlCarrito } from "../../hooks/useAgregarAlCarrito";

export default function DetalleProducto() {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const { agregarProducto, elementoAviso } = useAgregarAlCarrito();
  const producto = obtenerProducto(id);

  useEffect(() => {
    setCantidad(1);
  }, [id]);

  if (producto === null) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3">No encontramos este producto</h1>
        <Link className="btn btn-primary mt-2" to="/productos">Volver al catalogo</Link>
      </section>
    );
  }

  const relacionados = productosPorCategoria(producto.categoria)
    .filter((p) => p.id !== producto.id)
    .slice(0, 4);
  const precio = precioFinal(producto);

  return (
    <section className="container py-4">
      <nav aria-label="Ruta de navegacion">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
          <li className="breadcrumb-item"><Link to={"/categorias/" + producto.categoria}>{producto.categoria}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
        </ol>
      </nav>

      <article className="row g-4 bg-white rounded-4 shadow-sm p-3 p-lg-4 mx-0">
        <div className="col-12 col-md-6 text-center">
          <img className="img-fluid imagen-detalle" src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="col-12 col-md-6">
          <span className="badge text-bg-light border mb-2">{producto.categoria}</span>
          <h1 className="h2">{producto.nombre}</h1>
          <p className="small text-secondary">Codigo {producto.codigo}</p>

          <div className="mb-3">
            {producto.oferta > 0 && (
              <>
                <span className="text-secondary text-decoration-line-through me-2">{formatoPrecio(producto.precio)}</span>
                <span className="badge text-bg-danger me-2">-{producto.oferta}%</span>
              </>
            )}
            <span className="fs-2 fw-bold">{precio === 0 ? "Gratis" : formatoPrecio(precio)}</span>
          </div>

          <p>{producto.descripcion}</p>

          {producto.stock <= 0 ? (
            <div className="alert alert-danger py-2">Producto sin stock por el momento.</div>
          ) : (
            <>
              <p className={producto.stock <= producto.stockCritico ? "text-danger small" : "text-secondary small"}>
                {producto.stock <= producto.stockCritico
                  ? "Ultimas " + producto.stock + " unidades"
                  : "Quedan " + producto.stock + " unidades en la tienda"}
              </p>

              <div className="d-flex align-items-center gap-3">
                <div style={{ width: "130px" }}>
                  <Contador valor={cantidad} minimo={1} maximo={producto.stock} onCambiar={setCantidad} />
                </div>
                <button className="btn btn-primary" type="button" onClick={() => agregarProducto(producto, cantidad)}>
                  <i className="bi bi-cart-plus me-1"></i> Añadir al carrito
                </button>
              </div>
            </>
          )}
        </div>
      </article>

      {relacionados.length > 0 && (
        <div className="mt-5">
          <h2 className="h4 mb-3">Productos relacionados</h2>
          <ListaProductos productos={relacionados} onAgregar={(p) => agregarProducto(p)} />
        </div>
      )}

      {elementoAviso}
    </section>
  );
}
