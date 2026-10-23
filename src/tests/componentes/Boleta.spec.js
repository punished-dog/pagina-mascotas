import { render, screen } from "@testing-library/react";
import Boleta from "../../components/Boleta";
import { crearOrden } from "../ayudantes";

describe("Boleta", () => {
  it("muestra el numero, el cliente y una fila por producto", () => {
    const { container } = render(<Boleta orden={crearOrden()} />);

    expect(screen.getByText("Boleta N° 2001")).toBeTruthy();
    expect(screen.getByText("Camila Diaz Munoz")).toBeTruthy();
    expect(container.querySelectorAll("tbody tr").length).toBe(2);
    expect(screen.getByText("$5.986")).toBeTruthy();
  });

  it("muestra el descuento solo cuando la orden tiene cupon", () => {
    const { rerender } = render(<Boleta orden={crearOrden()} />);
    expect(screen.queryByText(/Descuento/)).toBeNull();

    rerender(<Boleta orden={crearOrden({ cupon: "GUAUMIAU10", descuento: 3098, total: 27878 })} />);
    expect(screen.getByText("Descuento GUAUMIAU10")).toBeTruthy();
    expect(screen.getByText("-$3.098")).toBeTruthy();
  });

  it("muestra el despacho gratis o con su valor", () => {
    const { rerender } = render(<Boleta orden={crearOrden()} />);
    expect(screen.getByText("Gratis")).toBeTruthy();

    rerender(<Boleta orden={crearOrden({ despacho: 3990 })} />);
    expect(screen.getByText("$3.990")).toBeTruthy();
  });

  it("pinta el estado en verde o rojo", () => {
    const { rerender } = render(<Boleta orden={crearOrden()} />);
    expect(screen.getByText("Pagada").className).toContain("text-bg-success");

    rerender(<Boleta orden={crearOrden({ estado: "Rechazada" })} />);
    expect(screen.getByText("Rechazada").className).toContain("text-bg-danger");
  });
});
