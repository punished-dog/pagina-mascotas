import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import Aviso from "../components/Aviso";

export function useAgregarAlCarrito() {
  const { agregar } = useCarrito();
  const [aviso, setAviso] = useState({ mensaje: "", tipo: "exito" });

  function agregarProducto(producto, cantidad = 1) {
    const error = agregar(producto, cantidad);
    if (error) {
      setAviso({ mensaje: error, tipo: "error" });
    } else {
      setAviso({ mensaje: producto.nombre + " se agrego al carrito", tipo: "exito" });
    }
  }

  const elementoAviso = (
    <Aviso
      mensaje={aviso.mensaje}
      tipo={aviso.tipo}
      onCerrar={() => setAviso({ mensaje: "", tipo: "exito" })}
    />
  );

  return { agregarProducto, elementoAviso };
}
