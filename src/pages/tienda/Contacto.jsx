import { useState } from "react";
import CampoTexto from "../../components/CampoTexto";
import { validarContacto, sinErrores } from "../../utils/validaciones";

const vacio = { nombre: "", correo: "", comentario: "" };

export default function Contacto() {
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function cambiarCampo(campo, valor) {
    setDatos({ ...datos, [campo]: valor });
    setErrores({ ...errores, [campo]: "" });
    setEnviado(false);
  }

  function enviar(e) {
    e.preventDefault();
    const nuevosErrores = validarContacto(datos);
    setErrores(nuevosErrores);
    if (sinErrores(nuevosErrores)) {
      setEnviado(true);
      setDatos(vacio);
    }
  }

  return (
    <section className="container py-4">
      <h1 className="h2 mb-4">Contacto</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <form className="card shadow-sm card-body" onSubmit={enviar} noValidate>
            <h2 className="h5 mb-3">Formulario de contacto</h2>
            {enviado && (
              <div className="alert alert-success py-2" role="status">
                Gracias por escribirnos, te responderemos dentro de 48 horas.
              </div>
            )}
            <CampoTexto id="nombre" etiqueta="Nombre completo" obligatorio valor={datos.nombre} onCambiar={cambiarCampo} error={errores.nombre || ""} maxLength={100} />
            <CampoTexto id="correo" etiqueta="Correo" tipo="email" obligatorio valor={datos.correo} onCambiar={cambiarCampo} error={errores.correo || ""} ayuda="Correos aceptados: @duoc.cl, @profesor.duoc.cl y @gmail.com" />
            <CampoTexto id="comentario" etiqueta="Comentario" multilinea obligatorio valor={datos.comentario} onCambiar={cambiarCampo} error={errores.comentario || ""} ayuda={datos.comentario.length + "/500 caracteres"} maxLength={500} />
            <button className="btn btn-primary" type="submit">Enviar mensaje</button>
          </form>
        </div>

        <aside className="col-12 col-lg-5 d-flex flex-column gap-3">
          <div className="card shadow-sm card-body">
            <h2 className="h5"><i className="bi bi-geo-alt text-marca me-2"></i>Donde estamos</h2>
            <p className="mb-1">Av. Don Ramon 1234, Santiago.</p>
            <p className="mb-0 text-secondary">Lunes a sabado de 10:00 a 20:00.</p>
          </div>
          <div className="card shadow-sm card-body">
            <h2 className="h5"><i className="bi bi-telephone text-marca me-2"></i>Otros canales</h2>
            <p className="mb-1">Telefono: +56 2 2345 6789</p>
            <p className="mb-0">Correo: contacto@guaumiau.cl</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
