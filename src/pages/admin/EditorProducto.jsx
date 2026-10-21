import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormularioProducto from "../../components/admin/FormularioProducto";
import { crearProducto, actualizarProducto, obtenerProducto, listarProductos } from "../../data/productos";
import { listarCategorias } from "../../data/categorias";

export default function EditorProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esNuevo = id === undefined;
  const producto = esNuevo ? null : obtenerProducto(id);
  const [error, setError] = useState("");

  if (!esNuevo && producto === null) {
    return (
      <div className="alert alert-warning">
        No existe el producto. <Link to="/admin/productos">Volver a productos</Link>
      </div>
    );
  }

  function guardar(datos) {
    const repetido = listarProductos().find((p) => p.codigo === datos.codigo && (esNuevo || p.id !== producto.id));
    if (repetido) {
      setError("Ya existe un producto con el codigo " + datos.codigo + ".");
      return;
    }
    const guardado = esNuevo ? crearProducto(datos) : actualizarProducto(producto.id, datos);
    navigate("/admin/productos/" + guardado.id);
  }

  return (
    <>
      <Link className="small" to="/admin/productos"><i className="bi bi-arrow-left me-1"></i>Volver a productos</Link>
      <h1 className="h3 mt-2 mb-3">{esNuevo ? "Nuevo producto" : "Editar " + producto.nombre}</h1>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {error !== "" && <div className="alert alert-danger py-2">{error}</div>}
          <FormularioProducto
            key={id || "nuevo"}
            inicial={producto}
            categorias={listarCategorias()}
            onGuardar={guardar}
            onCancelar={() => navigate(-1)}
            textoBoton={esNuevo ? "Crear producto" : "Guardar cambios"}
          />
        </div>
      </div>
    </>
  );
}
