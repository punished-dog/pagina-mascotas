import { createContext, useContext, useEffect, useState } from "react";
import { leer, guardar } from "../data/almacen";
import { listarProductos } from "../data/productos";
import {
  agregarItem,
  cambiarCantidad,
  quitarItem,
  detalleItems,
  calcularResumen,
  cuponValido,
  normalizarCupon,
  contarUnidades
} from "../utils/carrito";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => leer("gm_carrito", []));
  const [cupon, setCupon] = useState(() => leer("gm_cupon", ""));

  useEffect(() => {
    guardar("gm_carrito", items);
  }, [items]);

  useEffect(() => {
    guardar("gm_cupon", cupon);
  }, [cupon]);

  function agregar(producto, cantidad = 1) {
    const resultado = agregarItem(items, producto, cantidad);
    if (resultado.error === "") {
      setItems(resultado.items);
    }
    return resultado.error;
  }

  function cambiar(id, cantidad) {
    const producto = listarProductos().find((p) => p.id === id);
    const stock = producto ? producto.stock : 0;
    setItems(cambiarCantidad(items, id, cantidad, stock));
  }

  function quitar(id) {
    setItems(quitarItem(items, id));
  }

  function vaciar() {
    setItems([]);
    setCupon("");
  }

  function aplicarCupon(codigo) {
    if (cuponValido(codigo)) {
      setCupon(normalizarCupon(codigo));
      return true;
    }
    setCupon("");
    return false;
  }

  const lineas = detalleItems(items, listarProductos());
  const resumen = calcularResumen(lineas, cupon);

  const valor = {
    items,
    lineas,
    resumen,
    cupon,
    unidades: contarUnidades(items),
    agregar,
    cambiar,
    quitar,
    vaciar,
    aplicarCupon
  };

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  return useContext(CarritoContext);
}
