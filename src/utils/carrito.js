import { precioFinal } from "./formato";

export const COSTO_DESPACHO = 3990;
export const MONTO_DESPACHO_GRATIS = 30000;
export const CUPONES = { GUAUMIAU10: 10, MASCOTA5: 5 };

export function agregarItem(items, producto, cantidad) {
  if (producto.stock <= 0) {
    return { items, error: "Este producto esta sin stock por el momento." };
  }
  const existente = items.find((i) => i.id === producto.id);
  const enCarrito = existente ? existente.cantidad : 0;
  if (enCarrito + cantidad > producto.stock) {
    return { items, error: "Solo quedan " + producto.stock + " unidades de " + producto.nombre + "." };
  }
  if (existente) {
    return {
      items: items.map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i)),
      error: ""
    };
  }
  return { items: [...items, { id: producto.id, cantidad }], error: "" };
}

export function cambiarCantidad(items, id, cantidad, stock) {
  if (cantidad < 1) {
    return quitarItem(items, id);
  }
  if (cantidad > stock) {
    return items;
  }
  return items.map((i) => (i.id === id ? { ...i, cantidad } : i));
}

export function quitarItem(items, id) {
  return items.filter((i) => i.id !== id);
}

export function detalleItems(items, productos) {
  const lineas = [];
  items.forEach((item) => {
    const producto = productos.find((p) => p.id === item.id);
    if (producto) {
      const precio = precioFinal(producto);
      lineas.push({
        id: producto.id,
        nombre: producto.nombre,
        imagen: producto.imagen,
        stock: producto.stock,
        precio,
        cantidad: item.cantidad,
        subtotal: precio * item.cantidad
      });
    }
  });
  return lineas;
}

export function calcularResumen(lineas, cupon) {
  const subtotal = lineas.reduce((total, linea) => total + linea.subtotal, 0);
  const porcentaje = CUPONES[cupon] || 0;
  const descuento = Math.round((subtotal * porcentaje) / 100);
  let despacho = 0;
  if (subtotal > 0 && subtotal < MONTO_DESPACHO_GRATIS) {
    despacho = COSTO_DESPACHO;
  }
  return { subtotal, descuento, despacho, total: subtotal - descuento + despacho };
}

export function normalizarCupon(codigo) {
  return codigo.trim().toUpperCase();
}

export function cuponValido(codigo) {
  return Object.prototype.hasOwnProperty.call(CUPONES, normalizarCupon(codigo));
}

export function contarUnidades(items) {
  return items.reduce((total, item) => total + item.cantidad, 0);
}
