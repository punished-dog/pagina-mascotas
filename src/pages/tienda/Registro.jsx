import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CampoTexto from "../../components/CampoTexto";
import SelectorRegion from "../../components/SelectorRegion";
import { useSesion } from "../../context/SesionContext";
import { crearUsuario } from "../../data/usuarios";
import { validarDatosUsuario, sinErrores } from "../../utils/validaciones";

const vacio = {
  run: "",
  nombre: "",
  apellidos: "",
  correo: "",
  fechaNacimiento: "",
  region: "",
  comuna: "",
  direccion: "",
  password: "",
  confirmar: ""
};

export default function Registro() {
  const { iniciarSesion } = useSesion();
  const navigate = useNavigate();
  const [parametros] = useSearchParams();
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  function cambiarCampo(campo, valor) {
    setDatos((anteriores) => ({ ...anteriores, [campo]: valor }));
    setErrores((anteriores) => ({ ...anteriores, [campo]: "" }));
  }

  function enviar(e) {
    e.preventDefault();
    const nuevosErrores = validarDatosUsuario(datos, true);
    setErrores(nuevosErrores);
    if (!sinErrores(nuevosErrores)) {
      setMensaje("Revisa los campos marcados en rojo.");
      return;
    }

    const { confirmar, ...resto } = datos;
    const resultado = crearUsuario({
      ...resto,
      run: resto.run.trim().toUpperCase(),
      nombre: resto.nombre.trim(),
      apellidos: resto.apellidos.trim(),
      correo: resto.correo.trim().toLowerCase(),
      direccion: resto.direccion.trim(),
      tipo: "Cliente"
    });

    if (!resultado.ok) {
      setMensaje(resultado.error);
      return;
    }

    iniciarSesion(resultado.usuario.correo, resultado.usuario.password);
    navigate(parametros.get("volver") || "/");
  }

  return (
    <section className="container py-5" style={{ maxWidth: "720px" }}>
      <div className="text-center mb-4">
        <img src="/fotos/logo.png" alt="logo de GuauMiau" width="72" height="72" className="rounded-circle" />
        <h1 className="h3 mt-2">Crear cuenta</h1>
        <p className="text-secondary mb-0">Registrate para comprar y revisar tus pedidos.</p>
      </div>

      <form className="card shadow-sm card-body" onSubmit={enviar} noValidate>
        {mensaje !== "" && <div className="alert alert-danger py-2" role="alert">{mensaje}</div>}

        <div className="row">
          <div className="col-12 col-md-6">
            <CampoTexto id="run" etiqueta="Run" obligatorio valor={datos.run} onCambiar={cambiarCampo} error={errores.run || ""} ayuda="Sin puntos ni guion, por ejemplo 19000015K" maxLength={9} />
          </div>
          <div className="col-12 col-md-6">
            <CampoTexto id="fechaNacimiento" etiqueta="Fecha de nacimiento" tipo="date" valor={datos.fechaNacimiento} onCambiar={cambiarCampo} ayuda="Opcional" />
          </div>
          <div className="col-12 col-md-6">
            <CampoTexto id="nombre" etiqueta="Nombre" obligatorio valor={datos.nombre} onCambiar={cambiarCampo} error={errores.nombre || ""} />
          </div>
          <div className="col-12 col-md-6">
            <CampoTexto id="apellidos" etiqueta="Apellidos" obligatorio valor={datos.apellidos} onCambiar={cambiarCampo} error={errores.apellidos || ""} />
          </div>
        </div>

        <CampoTexto id="correo" etiqueta="Correo" tipo="email" obligatorio valor={datos.correo} onCambiar={cambiarCampo} error={errores.correo || ""} ayuda="Correos aceptados: @duoc.cl, @profesor.duoc.cl y @gmail.com" />

        <SelectorRegion region={datos.region} comuna={datos.comuna} onCambiar={cambiarCampo} errorRegion={errores.region || ""} errorComuna={errores.comuna || ""} />

        <CampoTexto id="direccion" etiqueta="Direccion" obligatorio valor={datos.direccion} onCambiar={cambiarCampo} error={errores.direccion || ""} />

        <div className="row">
          <div className="col-12 col-md-6">
            <CampoTexto id="password" etiqueta="Contraseña" tipo="password" obligatorio valor={datos.password} onCambiar={cambiarCampo} error={errores.password || ""} ayuda="Entre 4 y 10 caracteres" />
          </div>
          <div className="col-12 col-md-6">
            <CampoTexto id="confirmar" etiqueta="Repetir contraseña" tipo="password" obligatorio valor={datos.confirmar} onCambiar={cambiarCampo} error={errores.confirmar || ""} />
          </div>
        </div>

        <button className="btn btn-primary w-100" type="submit">Crear cuenta</button>
        <p className="text-center small mt-3 mb-0">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
        </p>
      </form>
    </section>
  );
}
