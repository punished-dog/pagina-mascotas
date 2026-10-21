import { useState } from "react";
import CampoTexto from "../CampoTexto";
import { validarProducto, sinErrores } from "../../utils/validaciones";

export const imagenesDisponibles = [
  "/fotos/producto1.png",
  "/fotos/producto2.png",
  "/fotos/producto3.png",
  "/fotos/producto4.png",
  "/fotos/producto5.png",
  "/fotos/producto6.png",
  "/fotos/producto7.png",
  "/fotos/producto8.png"
];

const vacio = {
  codigo: "",
  nombre: "",
  descripcion: "",
  precio: "",
  oferta: "0",
  stock: "",
  stockCritico: "",
  categoria: "",
  imagen: imagenesDisponibles[0]
};

function aTexto(producto) {
  if (!producto) {
    return vacio;
  }
  return {
    codigo: producto.codigo,
    nombre: producto.nombre,
    descripcion: producto.descripcion || "",
    precio: String(producto.precio),
    oferta: String(producto.oferta || 0),
    stock: String(producto.stock),
    stockCritico: producto.stockCritico === undefined ? "" : String(producto.stockCritico),
    categoria: producto.categoria,
    imagen: producto.imagen
  };
}

export default function FormularioProducto({ inicial, categorias, onGuardar, onCancelar, textoBoton = "Guardar producto" }) {
  const [datos, setDatos] = useState(() => aTexto(inicial));
  const [errores, setErrores] = useState({});

  function cambiarCampo(campo, valor) {
    setDatos((anteriores) => ({ ...anteriores, [campo]: valor }));
    setErrores((anteriores) => ({ ...anteriores, [campo]: "" }));
  }

  function enviar(e) {
    e.preventDefault();
    const nuevosErrores = validarProducto(datos);
    setErrores(nuevosErrores);
    if (!sinErrores(nuevosErrores)) {
      return;
    }
    onGuardar({
      codigo: datos.codigo.trim().toUpperCase(),
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      precio: Number(datos.precio),
      oferta: datos.oferta === "" ? 0 : Number(datos.oferta),
      stock: Number(datos.stock),
      stockCritico: datos.stockCritico === "" ? 0 : Number(datos.stockCritico),
      categoria: datos.categoria,
      imagen: datos.imagen
    });
  }

  return (
    <form onSubmit={enviar} noValidate aria-label="Formulario de producto">
      <div className="row">
        <div className="col-12 col-md-4">
          <CampoTexto id="codigo" etiqueta="Codigo" obligatorio valor={datos.codigo} onCambiar={cambiarCampo} error={errores.codigo || ""} ayuda="Minimo 3 caracteres" />
        </div>
        <div className="col-12 col-md-8">
          <CampoTexto id="nombre" etiqueta="Nombre" obligatorio valor={datos.nombre} onCambiar={cambiarCampo} error={errores.nombre || ""} />
        </div>
      </div>

      <CampoTexto id="descripcion" etiqueta="Descripcion" multilinea valor={datos.descripcion} onCambiar={cambiarCampo} error={errores.descripcion || ""} ayuda="Opcional, maximo 500 caracteres" />

      <div className="row">
        <div className="col-6 col-md-3">
          <CampoTexto id="precio" etiqueta="Precio" tipo="number" min="0" obligatorio valor={datos.precio} onCambiar={cambiarCampo} error={errores.precio || ""} />
        </div>
        <div className="col-6 col-md-3">
          <CampoTexto id="oferta" etiqueta="Oferta (%)" tipo="number" min="0" max="90" valor={datos.oferta} onCambiar={cambiarCampo} error={errores.oferta || ""} />
        </div>
        <div className="col-6 col-md-3">
          <CampoTexto id="stock" etiqueta="Stock" tipo="number" min="0" obligatorio valor={datos.stock} onCambiar={cambiarCampo} error={errores.stock || ""} />
        </div>
        <div className="col-6 col-md-3">
          <CampoTexto id="stockCritico" etiqueta="Stock critico" tipo="number" min="0" valor={datos.stockCritico} onCambiar={cambiarCampo} error={errores.stockCritico || ""} />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <label className="form-label" htmlFor="categoria">Categoria<span className="text-danger"> *</span></label>
          <select
            id="categoria"
            className={"form-select" + (errores.categoria ? " is-invalid" : "")}
            value={datos.categoria}
            onChange={(e) => cambiarCampo("categoria", e.target.value)}
          >
            <option value="">Selecciona una categoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.nombre}>{c.nombre}</option>
            ))}
          </select>
          {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
        </div>

        <div className="col-12 col-md-6 mb-3">
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
      </div>

      <div className="d-flex gap-2 justify-content-end">
        {onCancelar && (
          <button className="btn btn-outline-secondary" type="button" onClick={onCancelar}>Cancelar</button>
        )}
        <button className="btn btn-primary" type="submit">{textoBoton}</button>
      </div>
    </form>
  );
}
