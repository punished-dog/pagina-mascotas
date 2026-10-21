import { resumenVentas, ventasPorProducto, ventasPorCategoria, ventasPorDia, convertirCsv } from "../../utils/reportes";
import { crearOrden, crearProducto } from "../ayudantes";

const ordenes = [
  crearOrden({ id: 1, fecha: "2026-10-01T10:00:00", total: 30000 }),
  crearOrden({ id: 2, fecha: "2026-10-01T18:00:00", total: 10000, items: [{ id: 4, nombre: "Pelota", precio: 2993, cantidad: 1 }] }),
  crearOrden({ id: 3, fecha: "2026-10-02T09:00:00", estado: "Rechazada", total: 99999 })
];

const productos = [
  crearProducto({ id: 1, categoria: "Alimentos" }),
  crearProducto({ id: 4, codigo: "JU001", nombre: "Pelota", categoria: "Juguetes", stock: 2, stockCritico: 5 })
];

describe("reportes", () => {
  it("resume solo las ordenes pagadas", () => {
    expect(resumenVentas(ordenes)).toEqual({ total: 40000, pagadas: 2, rechazadas: 1, promedio: 20000 });
    expect(resumenVentas([]).promedio).toBe(0);
  });

  it("cuenta unidades por producto, ordena de mayor a menor y marca los criticos", () => {
    const filas = ventasPorProducto(ordenes, productos);

    expect(filas[0].id).toBe(4);
    expect(filas[0].unidades).toBe(3);
    expect(filas[0].critico).toBeTrue();
    expect(filas[1].unidades).toBe(1);
  });

  it("agrupa por categoria y por dia", () => {
    const porCategoria = ventasPorCategoria(ventasPorProducto(ordenes, productos));
    expect(porCategoria.map((c) => c.categoria)).toEqual(["Alimentos", "Juguetes"]);

    expect(ventasPorDia(ordenes)).toEqual([{ dia: "2026-10-01", total: 40000 }]);
  });

  it("arma un csv separado por punto y coma", () => {
    const csv = convertirCsv([{ nombre: "Cama; grande", total: 10 }], [
      { campo: "nombre", titulo: "Producto" },
      { campo: "total", titulo: "Total" }
    ]);

    expect(csv).toBe("Producto;Total\nCama, grande;10");
  });
});
