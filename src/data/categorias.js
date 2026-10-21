import { leer, guardar, siguienteId } from "./almacen";
import { categoriasIniciales } from "./datosIniciales";
import { productosPorCategoria, renombrarCategoria } from "./productos";

const CLAVE = "gm_categorias";

export function listarCategorias() {
  return leer(CLAVE, categoriasIniciales);
}

export function obtenerCategoria(id) {
  const encontrada = listarCategorias().find((c) => c.id === Number(id));
  return encontrada || null;
}

export function obtenerCategoriaPorNombre(nombre) {
  const encontrada = listarCategorias().find(
    (c) => c.nombre.toLowerCase() === String(nombre).toLowerCase()
  );
  return encontrada || null;
}

export function crearCategoria(datos) {
  const lista = listarCategorias();
  const nueva = { ...datos, id: siguienteId(lista) };
  lista.push(nueva);
  guardar(CLAVE, lista);
  return nueva;
}

export function actualizarCategoria(id, cambios) {
  const lista = listarCategorias();
  const indice = lista.findIndex((c) => c.id === Number(id));
  if (indice === -1) {
    return null;
  }
  const anterior = lista[indice].nombre;
  lista[indice] = { ...lista[indice], ...cambios, id: lista[indice].id };
  guardar(CLAVE, lista);
  if (cambios.nombre && cambios.nombre !== anterior) {
    renombrarCategoria(anterior, cambios.nombre);
  }
  return lista[indice];
}

export function eliminarCategoria(id) {
  const categoria = obtenerCategoria(id);
  if (categoria === null) {
    return false;
  }
  if (productosPorCategoria(categoria.nombre).length > 0) {
    return false;
  }
  guardar(CLAVE, listarCategorias().filter((c) => c.id !== Number(id)));
  return true;
}
