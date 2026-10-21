import { leer, guardar, siguienteId } from "./almacen";
import { productosIniciales } from "./datosIniciales";

const CLAVE = "gm_productos";

export function listarProductos() {
  return leer(CLAVE, productosIniciales);
}

export function obtenerProducto(id) {
  const encontrado = listarProductos().find((p) => p.id === Number(id));
  return encontrado || null;
}

export function crearProducto(datos) {
  const lista = listarProductos();
  const nuevo = { ...datos, id: siguienteId(lista) };
  lista.push(nuevo);
  guardar(CLAVE, lista);
  return nuevo;
}

export function actualizarProducto(id, cambios) {
  const lista = listarProductos();
  const indice = lista.findIndex((p) => p.id === Number(id));
  if (indice === -1) {
    return null;
  }
  lista[indice] = { ...lista[indice], ...cambios, id: lista[indice].id };
  guardar(CLAVE, lista);
  return lista[indice];
}

export function eliminarProducto(id) {
  const lista = listarProductos();
  const nueva = lista.filter((p) => p.id !== Number(id));
  guardar(CLAVE, nueva);
  return nueva.length < lista.length;
}

export function productosPorCategoria(categoria) {
  return listarProductos().filter((p) => p.categoria === categoria);
}

export function productosEnOferta() {
  return listarProductos().filter((p) => p.oferta > 0);
}

export function productosCriticos() {
  return listarProductos().filter((p) => p.stock <= p.stockCritico);
}

export function buscarProductos(texto) {
  const buscado = texto.trim().toLowerCase();
  if (buscado === "") {
    return listarProductos();
  }
  return listarProductos().filter(
    (p) =>
      p.nombre.toLowerCase().includes(buscado) ||
      p.categoria.toLowerCase().includes(buscado) ||
      p.codigo.toLowerCase().includes(buscado)
  );
}

export function descontarStock(items) {
  const lista = listarProductos();
  items.forEach((item) => {
    const producto = lista.find((p) => p.id === item.id);
    if (producto) {
      producto.stock = Math.max(0, producto.stock - item.cantidad);
    }
  });
  guardar(CLAVE, lista);
}

export function renombrarCategoria(nombreAnterior, nombreNuevo) {
  const lista = listarProductos();
  lista.forEach((p) => {
    if (p.categoria === nombreAnterior) {
      p.categoria = nombreNuevo;
    }
  });
  guardar(CLAVE, lista);
}
