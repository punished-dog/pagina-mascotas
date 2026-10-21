import { createContext, useContext, useState } from "react";
import { leer, guardar, borrar } from "../data/almacen";
import { validarCredenciales } from "../data/usuarios";

const SesionContext = createContext(null);

function sinPassword(usuario) {
  const { password, ...resto } = usuario;
  return resto;
}

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leer("gm_sesion", null));

  function iniciarSesion(correo, password) {
    const encontrado = validarCredenciales(correo, password);
    if (encontrado === null) {
      return null;
    }
    const activo = sinPassword(encontrado);
    setUsuario(activo);
    guardar("gm_sesion", activo);
    return activo;
  }

  function cerrarSesion() {
    setUsuario(null);
    borrar("gm_sesion");
  }

  function actualizarSesion(datos) {
    const activo = sinPassword(datos);
    setUsuario(activo);
    guardar("gm_sesion", activo);
  }

  const valor = {
    usuario,
    esAdmin: usuario !== null && usuario.tipo === "Administrador",
    puedeEntrarPanel: usuario !== null && usuario.tipo !== "Cliente",
    iniciarSesion,
    cerrarSesion,
    actualizarSesion
  };

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  return useContext(SesionContext);
}
