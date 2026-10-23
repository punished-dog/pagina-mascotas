import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  productosCriticos,
  buscarProductos,
  descontarStock
} from "../../data/productos";
import { productosIniciales } from "../../data/datosIniciales";
import { simularLocalStorage, crearProducto as productoEjemplo } from "../ayudantes";

describe("datos de productos (localStorage simulado)", () => {
  let guardado;

  beforeEach(() => {
    guardado = simularLocalStorage();
  });

  it("carga los productos iniciales la primera vez y los guarda", () => {
    const lista = listarProductos();

    expect(lista.length).toBe(productosIniciales.length);
    expect(localStorage.setItem).toHaveBeenCalledWith("gm_productos", jasmine.any(String));
    expect(JSON.parse(guardado.gm_productos).length).toBe(productosIniciales.length);
  });

  it("lee lo que ya esta guardado en vez de los datos iniciales", () => {
    guardado.gm_productos = JSON.stringify([productoEjemplo({ id: 50, nombre: "Guardado" })]);

    expect(listarProductos().map((p) => p.nombre)).toEqual(["Guardado"]);
    expect(obtenerProducto("50").nombre).toBe("Guardado");
    expect(obtenerProducto(999)).toBeNull();
  });

  it("crea un producto con el id siguiente y lo persiste", () => {
    guardado.gm_productos = JSON.stringify([productoEjemplo({ id: 3 }), productoEjemplo({ id: 8 })]);

    const nuevo = crearProducto({ nombre: "Arena", stock: 4 });

    expect(nuevo.id).toBe(9);
    expect(JSON.parse(guardado.gm_productos).length).toBe(3);
  });

  it("actualiza sin cambiar el id y elimina por id", () => {
    guardado.gm_productos = JSON.stringify([productoEjemplo({ id: 1 }), productoEjemplo({ id: 2 })]);

    const editado = actualizarProducto(1, { precio: 1000, id: 77 });
    expect(editado.id).toBe(1);
    expect(editado.precio).toBe(1000);
    expect(actualizarProducto(55, {})).toBeNull();

    expect(eliminarProducto(2)).toBeTrue();
    expect(eliminarProducto(2)).toBeFalse();
    expect(listarProductos().length).toBe(1);
  });

  it("encuentra criticos, busca por texto y descuenta stock sin bajar de 0", () => {
    guardado.gm_productos = JSON.stringify([
      productoEjemplo({ id: 1, nombre: "Rascador", codigo: "JU002", stock: 3, stockCritico: 4 }),
      productoEjemplo({ id: 2, nombre: "Cama", codigo: "AC001", categoria: "Accesorios", stock: 20 })
    ]);

    expect(productosCriticos().map((p) => p.id)).toEqual([1]);
    expect(buscarProductos("ACC").map((p) => p.id)).toEqual([2]);
    expect(buscarProductos("ju002").map((p) => p.id)).toEqual([1]);
    expect(buscarProductos("").length).toBe(2);

    descontarStock([{ id: 1, cantidad: 5 }, { id: 2, cantidad: 2 }]);
    expect(obtenerProducto(1).stock).toBe(0);
    expect(obtenerProducto(2).stock).toBe(18);
  });
});
