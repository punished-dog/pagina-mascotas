import { useState } from "react";
import CampoTexto from "../CampoTexto";
import SelectorRegion from "../SelectorRegion";
import { validarDatosUsuario, sinErrores } from "../../utils/validaciones";

export const tiposUsuario = ["Administrador", "Vendedor", "Cliente"];

function aFormulario(usuario) {
  return {
    run: usuario ? usuario.run : "",
    nombre: usuario ? usuario.nombre : "",
    apellidos: usuario ? usuario.apellidos : "",
    correo: usuario ? usuario.correo : "",
    fechaNacimiento: usuario && usuario.fechaNacimiento ? usuario.fechaNacimiento : "",
    tipo: usuario ? usuario.tipo : "Cliente",
    region: usuario && usuario.region ? usuario.region : "",
    comuna: usuario && usuario.comuna ? usuario.comuna : "",
    direccion: usuario && usuario.direccion ? usuario.direccion : "",
    password: "",
    confirmar: ""
  };
}

export default function FormularioUsuario({ inicial, esNuevo, permitirTipo = true, onGuardar, onCancelar, textoBoton = "Guardar" }) {
  const [datos, setDatos] = useState(() => aFormulario(inicial));
  const [errores, setErrores] = useState({});

  function cambiarCampo(campo, valor) {
    setDatos((anteriores) => ({ ...anteriores, [campo]: valor }));
    setErrores((anteriores) => ({ ...anteriores, [campo]: "" }));
  }

  function enviar(e) {
    e.preventDefault();
    const nuevosErrores = validarDatosUsuario(datos, esNuevo);
    setErrores(nuevosErrores);
    if (!sinErrores(nuevosErrores)) {
      return;
    }
    const { confirmar, ...resto } = datos;
    onGuardar({
      ...resto,
      run: resto.run.trim().toUpperCase(),
      nombre: resto.nombre.trim(),
      apellidos: resto.apellidos.trim(),
      correo: resto.correo.trim().toLowerCase(),
      direccion: resto.direccion.trim()
    });
  }

  return (
    <form onSubmit={enviar} noValidate aria-label="Formulario de usuario">
      <div className="row">
        <div className="col-12 col-md-6">
          <CampoTexto id="run" etiqueta="Run" obligatorio valor={datos.run} onCambiar={cambiarCampo} error={errores.run || ""} disabled={!esNuevo} ayuda={esNuevo ? "Sin puntos ni guion" : "El run no se puede cambiar"} maxLength={9} />
        </div>
        <div className="col-12 col-md-6">
          {permitirTipo ? (
            <div className="mb-3">
              <label className="form-label" htmlFor="tipo">Tipo de usuario<span className="text-danger"> *</span></label>
              <select id="tipo" className="form-select" value={datos.tipo} onChange={(e) => cambiarCampo("tipo", e.target.value)}>
                {tiposUsuario.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          ) : (
            <CampoTexto id="fechaNacimiento" etiqueta="Fecha de nacimiento" tipo="date" valor={datos.fechaNacimiento} onCambiar={cambiarCampo} />
          )}
        </div>
        <div className="col-12 col-md-6">
          <CampoTexto id="nombre" etiqueta="Nombre" obligatorio valor={datos.nombre} onCambiar={cambiarCampo} error={errores.nombre || ""} />
        </div>
        <div className="col-12 col-md-6">
          <CampoTexto id="apellidos" etiqueta="Apellidos" obligatorio valor={datos.apellidos} onCambiar={cambiarCampo} error={errores.apellidos || ""} />
        </div>
        <div className="col-12 col-md-6">
          <CampoTexto id="correo" etiqueta="Correo" tipo="email" obligatorio valor={datos.correo} onCambiar={cambiarCampo} error={errores.correo || ""} />
        </div>
        {permitirTipo && (
          <div className="col-12 col-md-6">
            <CampoTexto id="fechaNacimiento" etiqueta="Fecha de nacimiento" tipo="date" valor={datos.fechaNacimiento} onCambiar={cambiarCampo} />
          </div>
        )}
      </div>

      <SelectorRegion region={datos.region} comuna={datos.comuna} onCambiar={cambiarCampo} errorRegion={errores.region || ""} errorComuna={errores.comuna || ""} />
      <CampoTexto id="direccion" etiqueta="Direccion" obligatorio valor={datos.direccion} onCambiar={cambiarCampo} error={errores.direccion || ""} />

      <div className="row">
        <div className="col-12 col-md-6">
          <CampoTexto id="password" etiqueta={esNuevo ? "Contraseña" : "Nueva contraseña"} tipo="password" obligatorio={esNuevo} valor={datos.password} onCambiar={cambiarCampo} error={errores.password || ""} ayuda={esNuevo ? "Entre 4 y 10 caracteres" : "Dejala vacia para no cambiarla"} />
        </div>
        <div className="col-12 col-md-6">
          <CampoTexto id="confirmar" etiqueta="Repetir contraseña" tipo="password" obligatorio={esNuevo} valor={datos.confirmar} onCambiar={cambiarCampo} error={errores.confirmar || ""} />
        </div>
      </div>

      <div className="d-flex gap-2 justify-content-end">
        {onCancelar && <button className="btn btn-outline-secondary" type="button" onClick={onCancelar}>Cancelar</button>}
        <button className="btn btn-primary" type="submit">{textoBoton}</button>
      </div>
    </form>
  );
}
