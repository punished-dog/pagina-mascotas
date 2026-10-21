import { Link, useParams } from "react-router-dom";
import ListaProductos from "../../components/ListaProductos";
import { listarCategorias, obtenerCategoriaPorNombre } from "../../data/categorias";
import { productosPorCategoria } from "../../data/productos";
import { useAgregarAlCarrito } from "../../hooks/useAgregarAlCarrito";

export default function Categorias() {
  const { nombre } = useParams();
  const { agregarProducto, elementoAviso } = useAgregarAlCarrito();
  const categorias = listarCategorias();
  const seleccionada = nombre ? obtenerCategoriaPorNombre(nombre) : null;
  const aMostrar = nombre ? (seleccionada ? [seleccionada] : []) : categorias;

  return (
    <section className="container py-4">
      <h1 className="h2 mb-4">Categorias</h1>

      <div className="row g-3 justify-content-center mb-4">
        {categorias.map((categoria) => {
          const activa = seleccionada !== null && seleccionada.id === categoria.id;
          return (
            <div className="col-6 col-md-3 col-lg-2" key={categoria.id}>
              <Link
                className={"card h-100 text-decoration-none text-center shadow-sm tarjeta-categoria" + (activa ? " border-warning border-2" : "")}
                to={"/categorias/" + categoria.nombre}
                aria-current={activa ? "page" : undefined}
              >
                <img className="card-img-top p-2 bg-white" src={categoria.imagen} alt={categoria.nombre} />
                <div className="card-body py-2">
                  <span className="small fw-semibold">{categoria.nombre}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {nombre && seleccionada === null && (
        <div className="alert alert-warning">
          No existe la categoria "{nombre}". <Link to="/categorias">Ver todas las categorias</Link>
        </div>
      )}

      {aMostrar.map((categoria) => (
        <div className="mb-5" key={categoria.id}>
          <div className="d-flex justify-content-between align-items-end mb-1">
            <h2 className="h3 mb-0">{categoria.nombre}</h2>
            {!nombre && <Link to={"/categorias/" + categoria.nombre}>Ver solo esta categoria</Link>}
          </div>
          <p className="text-secondary">{categoria.descripcion}</p>
          <ListaProductos
            productos={productosPorCategoria(categoria.nombre)}
            onAgregar={(p) => agregarProducto(p)}
            mensajeVacio="Todavia no hay productos en esta categoria."
          />
        </div>
      ))}

      {elementoAviso}
    </section>
  );
}
