import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CampoTexto from "../../components/CampoTexto";
import { useSesion } from "../../context/SesionContext";
import { validarCorreo, validarPassword, sinErrores } from "../../utils/validaciones";

export default function Login() {
  const { iniciarSesion } = useSesion();
  const navigate = useNavigate();
  const [parametros] = useSearchParams();
  const volver = parametros.get("volver");
  const [datos, setDatos] = useState({ correo: "", password: "" });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  function cambiarCampo(campo, valor) {
    setDatos({ ...datos, [campo]: valor });
    setErrores({ ...errores, [campo]: "" });
    setMensaje("");
  }

  function enviar(e) {
    e.preventDefault();
    const nuevosErrores = {
      correo: validarCorreo(datos.correo),
      password: validarPassword(datos.password)
    };
    setErrores(nuevosErrores);
    if (!sinErrores(nuevosErrores)) {
      return;
    }

    const usuario = iniciarSesion(datos.correo, datos.password);
    if (usuario === null) {
      setMensaje("El correo o la contraseña no coinciden con ninguna cuenta.");
      return;
    }

    if (volver) {
      navigate(volver);
    } else if (usuario.tipo === "Cliente") {
      navigate("/");
    } else {
      navigate("/admin");
    }
  }

  return (
    <section className="container py-5" style={{ maxWidth: "460px" }}>
      <div className="text-center mb-4">
        <img src="/fotos/logo.png" alt="logo de GuauMiau" width="72" height="72" className="rounded-circle" />
        <h1 className="h3 mt-2">Iniciar sesion</h1>
        {volver === "/checkout" && (
          <p className="text-secondary small mb-0">Inicia sesion para terminar tu compra.</p>
        )}
      </div>

      <form className="card shadow-sm card-body" onSubmit={enviar} noValidate>
        {mensaje !== "" && <div className="alert alert-danger py-2" role="alert">{mensaje}</div>}

        <CampoTexto id="correo" etiqueta="Correo" tipo="email" valor={datos.correo} onCambiar={cambiarCampo} error={errores.correo || ""} autoComplete="email" />
        <CampoTexto id="password" etiqueta="Contraseña" tipo="password" valor={datos.password} onCambiar={cambiarCampo} error={errores.password || ""} autoComplete="current-password" />

        <button className="btn btn-primary w-100" type="submit">Ingresar</button>

        <p className="text-center small mt-3 mb-0">
          ¿No tienes cuenta? <Link to={"/registro" + (volver ? "?volver=" + volver : "")}>Registrate aqui</Link>
        </p>
      </form>

      <div className="small text-secondary mt-3">
        <p className="mb-1">Cuentas de prueba:</p>
        <ul className="mb-0">
          <li>Administrador: admin@duoc.cl / admin123</li>
          <li>Vendedor: vendedor@duoc.cl / vende123</li>
          <li>Cliente: camila@gmail.com / cami2024</li>
        </ul>
      </div>
    </section>
  );
}
