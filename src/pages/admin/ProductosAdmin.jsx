import { useState } from "react";
import { Link } from "react-router-dom";
import Confirmacion from "../../components/admin/Confirmacion";
import Aviso from "../../components/Aviso";
import { listarProductos, eliminarProducto } from "../../data/productos";
import { listarCategorias } from "../../data/categorias";
import { useSesion } from "../../context/SesionContext";
import { formatoPrecio } from "../../utils/formato";

export default function ProductosAdmin() {
  const { esAdmin } = useSesion();
  const [productos, setProductos] = useState(() => listarProductos());
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [aEliminar, setAEliminar] = useState(null);
  const [aviso, setAviso] = useState("");

  const buscado = texto.trim().toLowerCase();
  const filtrados = productos.filter(
    (p) =>
      (categoria === "" || p.categoria === categoria) &&
      (buscado === "" || p.nombre.toLowerCase().includes(buscado) || p.codigo.toLowerCase().includes(buscado))
  );

  function confirmarEliminar() {
    eliminarProducto(aEliminar.id);
    setProductos(listarProductos());
    setAviso("Se elimino el producto " + aEliminar.nombre);
    setAEliminar(null);
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">Productos</h1>
        <div className="d-flex flex-wrap gap-2">
          <Link className="btn btn-sm btn-outline-danger" to="/admin/productos/criticos">
            <i className="bi bi-exclamation-triangle me-1"></i>Productos criticos
          </Link>
          <Link className="btn btn-sm btn-outline-secondary" to="/admin/productos/reporte">
            <i className="bi bi-file-earmark-bar-graph me-1"></i>Reporte
          </Link>
          {esAdmin && (
            <Link className="btn btn-sm btn-primary" to="/admin/productos/nuevo">
              <i className="bi bi-plus-lg me-1"></i>Nuevo producto
            </Link>
          )}
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body row g-2">
          <div className="col-12 col-md-8">
            <input
              className="form-control"
              type="search"
              placeholder="Buscar por nombre o codigo"
              aria-label="Buscar producto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4">
            <select className="form-select" aria-label="Filtrar por categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Todas las categorias</option>
              {listarCategorias().map((c) => (
                <option key={c.id} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Codigo</th>
                <th scope="col">Producto</th>
                <th scope="col">Categoria</th>
                <th scope="col" className="text-end">Precio</th>
                <th scope="col" className="text-center">Stock</th>
                <th scope="col" className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-secondary py-4">No hay productos que coincidan.</td>
                </tr>
              )}
              {filtrados.map((p) => (
                <tr key={p.id}>
                  <td className="small text-secondary">{p.codigo}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img src={p.imagen} alt="" width="36" height="36" style={{ objectFit: "contain" }} />
                      {p.nombre}
                    </div>
                  </td>
                  <td>{p.categoria}</td>
                  <td className="text-end">
                    {formatoPrecio(p.precio)}
                    {p.oferta > 0 && <span className="badge text-bg-danger ms-1">-{p.oferta}%</span>}
                  </td>
                  <td className="text-center">
                    <span className={"badge " + (p.stock <= p.stockCritico ? "text-bg-danger" : "text-bg-light border")}>{p.stock}</span>
                  </td>
                  <td className="text-end text-nowrap">
                    <Link className="btn btn-sm btn-outline-secondary" to={"/admin/productos/" + p.id} aria-label={"Ver " + p.nombre}>
                      <i className="bi bi-eye"></i>
                    </Link>
                    {esAdmin && (
                      <>
                        <Link className="btn btn-sm btn-outline-primary ms-1" to={"/admin/productos/" + p.id + "/editar"} aria-label={"Editar " + p.nombre}>
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger ms-1" type="button" aria-label={"Eliminar " + p.nombre} onClick={() => setAEliminar(p)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Confirmacion
        abierta={aEliminar !== null}
        titulo="Eliminar producto"
        mensaje={aEliminar ? "¿Seguro que quieres eliminar " + aEliminar.nombre + "? Esta accion no se puede deshacer." : ""}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setAEliminar(null)}
      />
      <Aviso mensaje={aviso} onCerrar={() => setAviso("")} />
    </>
  );
}
