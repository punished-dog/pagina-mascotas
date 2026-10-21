import { leer, guardar } from "./almacen";
import { usuariosIniciales } from "./datosIniciales";

const CLAVE = "gm_usuarios";

export function listarUsuarios() {
  return leer(CLAVE, usuariosIniciales);
}

export function obtenerUsuario(run) {
  const encontrado = listarUsuarios().find((u) => u.run === run);
  return encontrado || null;
}

export function buscarPorCorreo(correo) {
  const buscado = correo.trim().toLowerCase();
  const encontrado = listarUsuarios().find((u) => u.correo.toLowerCase() === buscado);
  return encontrado || null;
}

export function crearUsuario(datos) {
  const lista = listarUsuarios();
  if (lista.some((u) => u.run === datos.run)) {
    return { ok: false, error: "Ese run ya esta registrado." };
  }
  if (buscarPorCorreo(datos.correo)) {
    return { ok: false, error: "Ya existe una cuenta registrada con ese correo." };
  }
  lista.push(datos);
  guardar(CLAVE, lista);
  return { ok: true, usuario: datos };
}

export function actualizarUsuario(run, cambios) {
  const lista = listarUsuarios();
  const indice = lista.findIndex((u) => u.run === run);
  if (indice === -1) {
    return { ok: false, error: "No se encontro el usuario." };
  }
  const otro = buscarPorCorreo(cambios.correo || lista[indice].correo);
  if (otro && otro.run !== run) {
    return { ok: false, error: "Ya existe una cuenta registrada con ese correo." };
  }
  const datos = { ...lista[indice], ...cambios, run: lista[indice].run };
  if (!cambios.password) {
    datos.password = lista[indice].password;
  }
  lista[indice] = datos;
  guardar(CLAVE, lista);
  return { ok: true, usuario: datos };
}

export function eliminarUsuario(run) {
  const lista = listarUsuarios();
  const nueva = lista.filter((u) => u.run !== run);
  guardar(CLAVE, nueva);
  return nueva.length < lista.length;
}

export function validarCredenciales(correo, password) {
  const usuario = buscarPorCorreo(correo);
  if (usuario && usuario.password === password) {
    return usuario;
  }
  return null;
}
