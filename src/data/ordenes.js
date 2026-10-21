import { leer, guardar, siguienteId } from "./almacen";
import { ordenesIniciales } from "./datosIniciales";

const CLAVE = "gm_ordenes";

export function listarOrdenes() {
  return leer(CLAVE, ordenesIniciales);
}

export function obtenerOrden(id) {
  const encontrada = listarOrdenes().find((o) => o.id === Number(id));
  return encontrada || null;
}

export function crearOrden(datos) {
  const lista = listarOrdenes();
  const nueva = {
    ...datos,
    id: siguienteId(lista),
    fecha: new Date().toISOString().slice(0, 19)
  };
  lista.push(nueva);
  guardar(CLAVE, lista);
  return nueva;
}

export function ordenesDeCliente(correo) {
  const buscado = correo.toLowerCase();
  return listarOrdenes().filter((o) => o.cliente.correo.toLowerCase() === buscado);
}

export function ordenesPagadas() {
  return listarOrdenes().filter((o) => o.estado === "Pagada");
}
