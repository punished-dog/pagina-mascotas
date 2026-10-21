import {
  agregarItem,
  cambiarCantidad,
  quitarItem,
  detalleItems,
  calcularResumen,
  cuponValido,
  contarUnidades,
  COSTO_DESPACHO
} from "../../utils/carrito";
import { crearProducto } from "../ayudantes";

describe("logica del carrito", () => {
  it("agrega un producto nuevo y suma cantidad si ya estaba", () => {
    const producto = crearProducto();
    let resultado = agregarItem([], producto, 2);
    expect(resultado.items).toEqual([{ id: 1, cantidad: 2 }]);

    resultado = agregarItem(resultado.items, producto, 3);
    expect(resultado.error).toBe("");
    expect(resultado.items).toEqual([{ id: 1, cantidad: 5 }]);
  });

  it("no deja agregar mas unidades que el stock ni productos sin stock", () => {
    const items = [{ id: 1, cantidad: 9 }];

    const masDelStock = agregarItem(items, crearProducto({ stock: 10 }), 2);
    expect(masDelStock.error).toBe("Solo quedan 10 unidades de Alimento perro adulto 15kg.");
    expect(masDelStock.items).toBe(items);

    const sinStock = agregarItem([], crearProducto({ stock: 0 }), 1);
    expect(sinStock.error).toBe("Este producto esta sin stock por el momento.");
  });

  it("quita el producto si la cantidad baja de 1 y respeta el stock al subir", () => {
    const items = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 1 }];

    expect(cambiarCantidad(items, 1, 0, 10)).toEqual([{ id: 2, cantidad: 1 }]);
    expect(cambiarCantidad(items, 1, 11, 10)).toBe(items);
    expect(cambiarCantidad(items, 1, 4, 10)[0].cantidad).toBe(4);
    expect(quitarItem(items, 2)).toEqual([{ id: 1, cantidad: 2 }]);
  });

  it("arma las lineas con el precio de oferta e ignora productos borrados", () => {
    const productos = [crearProducto({ id: 1, precio: 10000, oferta: 25 })];
    const lineas = detalleItems([{ id: 1, cantidad: 2 }, { id: 99, cantidad: 1 }], productos);

    expect(lineas.length).toBe(1);
    expect(lineas[0].precio).toBe(7500);
    expect(lineas[0].subtotal).toBe(15000);
  });

  it("cobra despacho bajo $30.000 y lo deja gratis desde ese monto", () => {
    expect(calcularResumen([{ subtotal: 29999 }], "").despacho).toBe(COSTO_DESPACHO);
    expect(calcularResumen([{ subtotal: 30000 }], "").despacho).toBe(0);
    expect(calcularResumen([], "").total).toBe(0);
  });

  it("aplica el descuento del cupon sobre el subtotal", () => {
    const resumen = calcularResumen([{ subtotal: 40000 }], "GUAUMIAU10");

    expect(resumen.descuento).toBe(4000);
    expect(resumen.total).toBe(36000);
    expect(cuponValido(" guaumiau10 ")).toBeTrue();
    expect(cuponValido("GRATIS100")).toBeFalse();
  });

  it("cuenta las unidades totales del carrito", () => {
    expect(contarUnidades([{ id: 1, cantidad: 2 }, { id: 2, cantidad: 3 }])).toBe(5);
  });
});
