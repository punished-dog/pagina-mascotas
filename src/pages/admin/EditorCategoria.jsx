import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CampoTexto from "../../components/CampoTexto";
import { imagenesDisponibles } from "../../components/admin/FormularioProducto";
import { crearCategoria, actualizarCategoria, obtenerCategoria, obtenerCategoriaPorNombre } from "../../data/categorias";
import { validarCategoria, sinErrores } from "../../utils/validaciones";

export default function EditorCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esNueva = id === undefined;
  const categoria = esNueva ? null : obtenerCategoria(id);
  const [datos, setDatos] = useState({
    nombre: categoria ? categoria.nombre : "",
    descripcion: categoria ? categoria.descripcion : "",
    imagen: categoria ? categoria.imagen : imagenesDisponibles[0]
  });
  const [errores, setErrores] = useState({});

  if (!esNueva && categoria === null) {
    return (
      <div className="alert alert-warning">
        No existe la categoria. <Link to="/admin/categorias">Volver a categorias</Link>
      </div>
    );
  }

  function cambiarCampo(campo, valor) {
    setDatos({ ...datos, [campo]: valor });
    setErrores({ ...errores, [campo]: "" });
  }

  function guardar(e) {
    e.preventDefault();
    const nuevosErrores = validarCategoria(datos);
    const repetida = obtenerCategoriaPorNombre(datos.nombre.trim());
    if (nuevosErrores.nombre === "" && repetida && (esNueva || repetida.id !== categoria.id)) {
      nuevosErrores.nombre = "Ya existe una categoria con ese nombre.";
    }
    setErrores(nuevosErrores);
    if (!sinErrores(nuevosErrores)) {
      return;
    }
    const limpios = { ...datos, nombre: datos.nombre.trim(), descripcion: datos.descripcion.trim() };
    if (esNueva) {
      crearCategoria(limpios);
    } else {
      actualizarCategoria(categoria.id, limpios);
    }
    navigate("/admin/categorias");
  }

  return (
    <div style={{ maxWidth: "720px" }}>
      <Link className="small" to="/admin/categorias"><i className="bi bi-arrow-left me-1"></i>Volver a categorias</Link>
      <h1 className="h3 mt-2 mb-3">{esNueva ? "Nueva categoria" : "Editar categoria"}</h1>

      <form className="card shadow-sm border-0 card-body" onSubmit={guardar} noValidate>
        <CampoTexto id="nombre" etiqueta="Nombre" obligatorio valor={datos.nombre} onCambiar={cambiarCampo} error={errores.nombre || ""} />
        <CampoTexto id="descripcion" etiqueta="Descripcion" multilinea valor={datos.descripcion} onCambiar={cambiarCampo} error={errores.descripcion || ""} ayuda="Opcional, maximo 300 caracteres" />

        <div className="mb-3">
          <label className="form-label" htmlFor="imagen">Imagen</label>
          <div className="d-flex gap-2 align-items-center">
            <select id="imagen" className="form-select" value={datos.imagen} onChange={(e) => cambiarCampo("imagen", e.target.value)}>
              {imagenesDisponibles.map((ruta) => (
                <option key={ruta} value={ruta}>{ruta.replace("/fotos/", "")}</option>
              ))}
            </select>
            <img src={datos.imagen} alt="Vista previa" width="48" height="48" className="border rounded bg-white" style={{ objectFit: "contain" }} />
          </div>
        </div>

        {!esNueva && datos.nombre.trim() !== categoria.nombre && datos.nombre.trim() !== "" && (
          <div className="alert alert-info py-2 small">
            Los productos de "{categoria.nombre}" pasaran a la categoria "{datos.nombre.trim()}".
          </div>
        )}

        <div className="d-flex gap-2 justify-content-end">
          <Link className="btn btn-outline-secondary" to="/admin/categorias">Cancelar</Link>
          <button className="btn btn-primary" type="submit">{esNueva ? "Crear categoria" : "Guardar cambios"}</button>
        </div>
      </form>
    </div>
  );
}
