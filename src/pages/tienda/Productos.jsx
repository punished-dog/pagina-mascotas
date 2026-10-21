import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ListaProductos from "../../components/ListaProductos";
import FiltroCategorias from "../../components/FiltroCategorias";
import { buscarProductos } from "../../data/productos";
import { listarCategorias } from "../../data/categorias";
import { precioFinal } from "../../utils/formato";
import { useAgregarAlCarrito } from "../../hooks/useAgregarAlCarrito";

function ordenarProductos(productos, orden) {
  const copia = [...productos];
  if (orden === "precio-menor") {
    copia.sort((a, b) => precioFinal(a) - precioFinal(b));
  } else if (orden === "precio-mayor") {
    copia.sort((a, b) => precioFinal(b) - precioFinal(a));
  } else if (orden === "nombre") {
    copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  return copia;
}

export default function Productos() {
  const [parametros] = useSearchParams();
  const busqueda = parametros.get("buscar") || "";
  const [categoria, setCategoria] = useState("");
  const [orden, setOrden] = useState("relevancia");
  const { agregarProducto, elementoAviso } = useAgregarAlCarrito();

  let productos = buscarProductos(busqueda);
  if (categoria !== "") {
    productos = productos.filter((p) => p.categoria === categoria);
  }
  productos = ordenarProductos(productos, orden);

  return (
    <section className="container py-4">
      <h1 className="h2 mb-3">Productos</h1>

      <div className="row g-4">
        <aside className="col-12 col-lg-3">
          <h2 className="h6 text-uppercase text-secondary">Categorias</h2>
          <FiltroCategorias
            categorias={listarCategorias()}
            seleccionada={categoria}
            onSeleccionar={setCategoria}
          />

          <label className="form-label mt-4 h6 text-uppercase text-secondary" htmlFor="orden">Ordenar por</label>
          <select id="orden" className="form-select" value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="relevancia">Relevancia</option>
            <option value="precio-menor">Menor precio</option>
            <option value="precio-mayor">Mayor precio</option>
            <option value="nombre">Nombre</option>
          </select>
        </aside>

        <div className="col-12 col-lg-9">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            <span className="text-secondary">
              {productos.length} {productos.length === 1 ? "producto" : "productos"}
            </span>
            {busqueda !== "" && (
              <span className="badge rounded-pill text-bg-light border">
                Busqueda: "{busqueda}"
                <Link className="ms-2 text-secondary" to="/productos" aria-label="Quitar busqueda">
                  <i className="bi bi-x"></i>
                </Link>
              </span>
            )}
          </div>

          <ListaProductos
            productos={productos}
            onAgregar={(p) => agregarProducto(p)}
            columnas="col-6 col-md-4"
            mensajeVacio="No encontramos productos con esos filtros."
          />
        </div>
      </div>

      {elementoAviso}
    </section>
  );
}
