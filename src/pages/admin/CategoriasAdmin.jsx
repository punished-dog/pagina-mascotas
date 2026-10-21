import { useState } from "react";
import { Link } from "react-router-dom";
import Confirmacion from "../../components/admin/Confirmacion";
import Aviso from "../../components/Aviso";
import { listarCategorias, eliminarCategoria } from "../../data/categorias";
import { productosPorCategoria } from "../../data/productos";

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState(() => listarCategorias());
  const [aEliminar, setAEliminar] = useState(null);
  const [aviso, setAviso] = useState({ mensaje: "", tipo: "exito" });

  function confirmarEliminar() {
    if (eliminarCategoria(aEliminar.id)) {
      setCategorias(listarCategorias());
      setAviso({ mensaje: "Se elimino la categoria " + aEliminar.nombre, tipo: "exito" });
    } else {
      setAviso({ mensaje: "No se puede eliminar una categoria que tiene productos.", tipo: "error" });
    }
    setAEliminar(null);
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">Categorias</h1>
        <Link className="btn btn-sm btn-primary" to="/admin/categorias/nueva">
          <i className="bi bi-plus-lg me-1"></i>Nueva categoria
        </Link>
      </div>

      <div className="row g-3">
        {categorias.map((c) => {
          const cantidad = productosPorCategoria(c.nombre).length;
          return (
            <div className="col-12 col-md-6 col-xl-4" key={c.id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex gap-3">
                  <img src={c.imagen} alt="" width="64" height="64" className="bg-white rounded" style={{ objectFit: "contain" }} />
                  <div className="flex-grow-1">
                    <h2 className="h6 mb-1">{c.nombre}</h2>
                    <p className="small text-secondary mb-2">{c.descripcion || "Sin descripcion"}</p>
                    <span className="badge text-bg-light border">{cantidad} {cantidad === 1 ? "producto" : "productos"}</span>
                  </div>
                </div>
                <div className="card-footer bg-white d-flex justify-content-end gap-1">
                  <Link className="btn btn-sm btn-outline-primary" to={"/admin/categorias/" + c.id + "/editar"}>
                    <i className="bi bi-pencil me-1"></i>Editar
                  </Link>
                  <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => setAEliminar(c)} aria-label={"Eliminar " + c.nombre}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Confirmacion
        abierta={aEliminar !== null}
        titulo="Eliminar categoria"
        mensaje={aEliminar ? "¿Seguro que quieres eliminar la categoria " + aEliminar.nombre + "?" : ""}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setAEliminar(null)}
      />
      <Aviso mensaje={aviso.mensaje} tipo={aviso.tipo} onCerrar={() => setAviso({ mensaje: "", tipo: "exito" })} />
    </>
  );
}
