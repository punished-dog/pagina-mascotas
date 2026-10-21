import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListaProductos from "../../components/ListaProductos";
import { crearProducto, futuro } from "../ayudantes";

describe("ListaProductos", () => {
  it("renderiza una tarjeta por cada producto de la lista", () => {
    const productos = [
      crearProducto({ id: 1, nombre: "Producto uno" }),
      crearProducto({ id: 2, nombre: "Producto dos" }),
      crearProducto({ id: 3, nombre: "Producto tres" })
    ];

    const { container } = render(
      <MemoryRouter future={futuro}>
        <ListaProductos productos={productos} onAgregar={() => {}} />
      </MemoryRouter>
    );

    expect(container.querySelectorAll(".tarjeta-producto").length).toBe(3);
    expect(screen.getByText("Producto dos")).toBeTruthy();
  });

  it("muestra el mensaje por defecto cuando la lista viene vacia", () => {
    render(<ListaProductos productos={[]} onAgregar={() => {}} />);

    expect(screen.getByText("No hay productos para mostrar.")).toBeTruthy();
  });

  it("muestra el mensaje personalizado que llega por props", () => {
    render(<ListaProductos productos={[]} onAgregar={() => {}} mensajeVacio="Sin resultados" />);

    expect(screen.getByText("Sin resultados")).toBeTruthy();
  });

  it("aplica las clases de columnas recibidas", () => {
    const { container } = render(
      <MemoryRouter future={futuro}>
        <ListaProductos productos={[crearProducto()]} onAgregar={() => {}} columnas="col-12" />
      </MemoryRouter>
    );

    expect(container.querySelector(".row > div").className).toBe("col-12");
  });
});
