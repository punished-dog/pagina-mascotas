import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TarjetaProducto from "../../components/TarjetaProducto";
import { crearProducto, futuro } from "../ayudantes";

function renderizar(props) {
  return render(
    <MemoryRouter future={futuro}>
      <TarjetaProducto {...props} />
    </MemoryRouter>
  );
}

describe("TarjetaProducto", () => {
  it("muestra el nombre, la categoria y el precio del producto que recibe por props", () => {
    renderizar({ producto: crearProducto(), onAgregar: () => {} });

    expect(screen.getByText("Alimento perro adulto 15kg")).toBeTruthy();
    expect(screen.getByText("Alimentos")).toBeTruthy();
    expect(screen.getByText("$24.990")).toBeTruthy();
  });

  it("muestra el descuento y el precio tachado solo cuando el producto tiene oferta", () => {
    const { rerender, container } = renderizar({ producto: crearProducto(), onAgregar: () => {} });
    expect(container.querySelector(".text-decoration-line-through")).toBeNull();

    rerender(
      <MemoryRouter future={futuro}>
        <TarjetaProducto producto={crearProducto({ oferta: 20 })} onAgregar={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("-20%")).toBeTruthy();
    expect(container.querySelector(".text-decoration-line-through").textContent).toBe("$24.990");
    expect(screen.getByText("$19.992")).toBeTruthy();
  });

  it("cambia el boton por el texto Sin stock cuando no quedan unidades", () => {
    renderizar({ producto: crearProducto({ stock: 0 }), onAgregar: () => {} });

    expect(screen.getByText("Sin stock")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("llama a onAgregar con el producto al hacer click en el boton", () => {
    const onAgregar = jasmine.createSpy("onAgregar");
    const producto = crearProducto();
    renderizar({ producto, onAgregar });

    fireEvent.click(screen.getByRole("button", { name: "Añadir al carrito" }));

    expect(onAgregar).toHaveBeenCalledTimes(1);
    expect(onAgregar).toHaveBeenCalledWith(producto);
  });

  it("usa el texto del boton que llega por props", () => {
    renderizar({ producto: crearProducto(), onAgregar: () => {}, textoBoton: "Comprar" });

    expect(screen.getByRole("button", { name: "Comprar" })).toBeTruthy();
  });

  it("enlaza el nombre al detalle del producto", () => {
    renderizar({ producto: crearProducto({ id: 7 }), onAgregar: () => {} });

    expect(screen.getByText("Alimento perro adulto 15kg").getAttribute("href")).toBe("/producto/7");
  });
});
