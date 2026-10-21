export function formatoPrecio(valor) {
  return "$" + Math.round(valor).toLocaleString("es-CL");
}

export function precioFinal(producto) {
  if (!producto.oferta) {
    return producto.precio;
  }
  return Math.round(producto.precio * (1 - producto.oferta / 100));
}

export function formatoFecha(fechaIso) {
  const fecha = new Date(fechaIso);
  return fecha.toLocaleDateString("es-CL") + " " + fecha.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
