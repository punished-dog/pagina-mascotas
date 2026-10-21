import { render, screen, fireEvent } from "@testing-library/react";
import { SesionProvider, useSesion } from "../../context/SesionContext";
import { CarritoProvider, useCarrito } from "../../context/CarritoContext";
import { simularLocalStorage, crearProducto } from "../ayudantes";

function PruebaSesion() {
  const { usuario, esAdmin, iniciarSesion, cerrarSesion } = useSesion();
  return (
    <div>
      <p>{usuario ? "Hola " + usuario.nombre + (esAdmin ? " (admin)" : "") : "Sin sesion"}</p>
      <button onClick={() => iniciarSesion("admin@duoc.cl", "mala")}>Entrar mal</button>
      <button onClick={() => iniciarSesion("admin@duoc.cl", "admin123")}>Entrar</button>
      <button onClick={cerrarSesion}>Salir</button>
    </div>
  );
}

function PruebaCarrito({ producto }) {
  const { unidades, resumen, cupon, agregar, aplicarCupon, vaciar } = useCarrito();
  return (
    <div>
      <p>Unidades: {unidades}</p>
      <p>Total: {resumen.total}</p>
      <p>Cupon: {cupon}</p>
      <button onClick={() => agregar(producto, 2)}>Agregar</button>
      <button onClick={() => aplicarCupon("guaumiau10")}>Cupon</button>
      <button onClick={vaciar}>Vaciar</button>
    </div>
  );
}

describe("Contextos de sesion y carrito", () => {
  let guardado;

  beforeEach(() => {
    guardado = simularLocalStorage({
      gm_usuarios: JSON.stringify([{ run: "1", nombre: "Ana", correo: "admin@duoc.cl", password: "admin123", tipo: "Administrador" }])
    });
  });

  it("inicia sesion solo con la clave correcta, la guarda sin password y la cierra", () => {
    render(<SesionProvider><PruebaSesion /></SesionProvider>);
    expect(screen.getByText("Sin sesion")).toBeTruthy();

    fireEvent.click(screen.getByText("Entrar mal"));
    expect(screen.getByText("Sin sesion")).toBeTruthy();

    fireEvent.click(screen.getByText("Entrar"));
    expect(screen.getByText("Hola Ana (admin)")).toBeTruthy();
    expect(JSON.parse(guardado.gm_sesion).password).toBeUndefined();

    fireEvent.click(screen.getByText("Salir"));
    expect(screen.getByText("Sin sesion")).toBeTruthy();
    expect(localStorage.removeItem).toHaveBeenCalledWith("gm_sesion");
  });

  it("agrega productos, aplica el cupon y guarda el carrito en localStorage", () => {
    const producto = crearProducto({ id: 1, precio: 20000 });
    guardado.gm_productos = JSON.stringify([producto]);
    render(<CarritoProvider><PruebaCarrito producto={producto} /></CarritoProvider>);

    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.getByText("Unidades: 2")).toBeTruthy();
    expect(screen.getByText("Total: 40000")).toBeTruthy();

    fireEvent.click(screen.getByText("Cupon"));
    expect(screen.getByText("Cupon: GUAUMIAU10")).toBeTruthy();
    expect(screen.getByText("Total: 36000")).toBeTruthy();
    expect(JSON.parse(guardado.gm_carrito)).toEqual([{ id: 1, cantidad: 2 }]);

    fireEvent.click(screen.getByText("Vaciar"));
    expect(screen.getByText("Unidades: 0")).toBeTruthy();
    expect(JSON.parse(guardado.gm_carrito)).toEqual([]);
  });
});
