export function resumenVentas(ordenes) {
  const pagadas = ordenes.filter((o) => o.estado === "Pagada");
  const total = pagadas.reduce((suma, o) => suma + o.total, 0);
  return {
    total,
    pagadas: pagadas.length,
    rechazadas: ordenes.length - pagadas.length,
    promedio: pagadas.length === 0 ? 0 : Math.round(total / pagadas.length)
  };
}

export function ventasPorProducto(ordenes, productos) {
  const conteo = {};
  ordenes
    .filter((o) => o.estado === "Pagada")
    .forEach((o) => {
      o.items.forEach((item) => {
        if (!conteo[item.id]) {
          conteo[item.id] = { unidades: 0, ingresos: 0 };
        }
        conteo[item.id].unidades += item.cantidad;
        conteo[item.id].ingresos += item.precio * item.cantidad;
      });
    });
  return productos
    .map((p) => ({
      id: p.id,
      codigo: p.codigo,
      nombre: p.nombre,
      categoria: p.categoria,
      stock: p.stock,
      critico: p.stock <= p.stockCritico,
      unidades: conteo[p.id] ? conteo[p.id].unidades : 0,
      ingresos: conteo[p.id] ? conteo[p.id].ingresos : 0
    }))
    .sort((a, b) => b.unidades - a.unidades);
}

export function ventasPorCategoria(filas) {
  const resultado = {};
  filas.forEach((fila) => {
    if (!resultado[fila.categoria]) {
      resultado[fila.categoria] = { categoria: fila.categoria, unidades: 0, ingresos: 0 };
    }
    resultado[fila.categoria].unidades += fila.unidades;
    resultado[fila.categoria].ingresos += fila.ingresos;
  });
  return Object.values(resultado).sort((a, b) => b.ingresos - a.ingresos);
}

export function ventasPorDia(ordenes) {
  const resultado = {};
  ordenes
    .filter((o) => o.estado === "Pagada")
    .forEach((o) => {
      const dia = o.fecha.slice(0, 10);
      resultado[dia] = (resultado[dia] || 0) + o.total;
    });
  return Object.keys(resultado)
    .sort()
    .map((dia) => ({ dia, total: resultado[dia] }));
}

export function convertirCsv(filas, columnas) {
  const encabezado = columnas.map((c) => c.titulo).join(";");
  const cuerpo = filas.map((fila) => columnas.map((c) => String(fila[c.campo]).replace(/;/g, ",")).join(";"));
  return [encabezado, ...cuerpo].join("\n");
}

export function descargarCsv(nombreArchivo, contenido) {
  const archivo = new Blob(["﻿" + contenido], { type: "text/csv;charset=utf-8" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(archivo);
  enlace.download = nombreArchivo;
  enlace.click();
  URL.revokeObjectURL(enlace.href);
}
