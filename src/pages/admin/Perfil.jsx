import { useState } from "react";
import FormularioUsuario from "../../components/admin/FormularioUsuario";
import { actualizarUsuario, obtenerUsuario } from "../../data/usuarios";
import { useSesion } from "../../context/SesionContext";

export default function Perfil() {
  const { usuario, actualizarSesion } = useSesion();
  const [mensaje, setMensaje] = useState(null);
  const [version, setVersion] = useState(0);
  const datosCompletos = obtenerUsuario(usuario.run) || usuario;

  function guardar(datos) {
    const resultado = actualizarUsuario(usuario.run, { ...datos, tipo: usuario.tipo });
    if (!resultado.ok) {
      setMensaje({ tipo: "danger", texto: resultado.error });
      return;
    }
    actualizarSesion(resultado.usuario);
    setMensaje({ tipo: "success", texto: "Tus datos se guardaron correctamente." });
    setVersion(version + 1);
  }

  return (
    <div style={{ maxWidth: "860px" }}>
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="rounded-circle bg-marca-suave d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
          <i className="bi bi-person fs-3 text-marca"></i>
        </div>
        <div>
          <h1 className="h3 mb-0">Mi perfil</h1>
          <span className="text-secondary">{usuario.tipo}</span>
        </div>
      </div>

      {mensaje !== null && <div className={"alert py-2 alert-" + mensaje.tipo}>{mensaje.texto}</div>}

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <FormularioUsuario
            key={version}
            inicial={datosCompletos}
            esNuevo={false}
            permitirTipo={false}
            onGuardar={guardar}
            textoBoton="Guardar mis datos"
          />
        </div>
      </div>
    </div>
  );
}
