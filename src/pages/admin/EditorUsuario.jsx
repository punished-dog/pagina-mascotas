import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormularioUsuario from "../../components/admin/FormularioUsuario";
import { crearUsuario, actualizarUsuario, obtenerUsuario } from "../../data/usuarios";
import { useSesion } from "../../context/SesionContext";

export default function EditorUsuario() {
  const { run } = useParams();
  const navigate = useNavigate();
  const { usuario: activo, actualizarSesion } = useSesion();
  const esNuevo = run === undefined;
  const usuario = esNuevo ? null : obtenerUsuario(run);
  const [error, setError] = useState("");

  if (!esNuevo && usuario === null) {
    return (
      <div className="alert alert-warning">
        No existe el usuario. <Link to="/admin/usuarios">Volver a usuarios</Link>
      </div>
    );
  }

  function guardar(datos) {
    const resultado = esNuevo ? crearUsuario(datos) : actualizarUsuario(usuario.run, datos);
    if (!resultado.ok) {
      setError(resultado.error);
      return;
    }
    if (!esNuevo && usuario.run === activo.run) {
      actualizarSesion(resultado.usuario);
    }
    navigate("/admin/usuarios/" + resultado.usuario.run);
  }

  return (
    <div style={{ maxWidth: "860px" }}>
      <Link className="small" to="/admin/usuarios"><i className="bi bi-arrow-left me-1"></i>Volver a usuarios</Link>
      <h1 className="h3 mt-2 mb-3">{esNuevo ? "Nuevo usuario" : "Editar a " + usuario.nombre + " " + usuario.apellidos}</h1>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {error !== "" && <div className="alert alert-danger py-2">{error}</div>}
          <FormularioUsuario
            key={run || "nuevo"}
            inicial={usuario}
            esNuevo={esNuevo}
            permitirTipo={esNuevo || usuario.run !== activo.run}
            onGuardar={guardar}
            onCancelar={() => navigate(-1)}
            textoBoton={esNuevo ? "Crear usuario" : "Guardar cambios"}
          />
        </div>
      </div>
    </div>
  );
}
