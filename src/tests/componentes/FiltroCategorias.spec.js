import { render, screen, fireEvent } from "@testing-library/react";
import FiltroCategorias from "../../components/FiltroCategorias";

const categorias = [
  { id: 1, nombre: "Alimentos" },
  { id: 2, nombre: "Juguetes" }
];

describe("FiltroCategorias", () => {
  it("agrega la opcion Todas antes de las categorias", () => {
    render(<FiltroCategorias categorias={categorias} seleccionada="" onSeleccionar={() => {}} />);

    const botones = screen.getAllByRole("button");
    expect(botones.map((b) => b.textContent)).toEqual(["Todas", "Alimentos", "Juguetes"]);
  });

  it("marca como activa solo la categoria seleccionada", () => {
    render(<FiltroCategorias categorias={categorias} seleccionada="Juguetes" onSeleccionar={() => {}} />);

    expect(screen.getByText("Juguetes").getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("Todas").getAttribute("aria-pressed")).toBe("false");
  });

  it("devuelve el nombre de la categoria o vacio para Todas", () => {
    const onSeleccionar = jasmine.createSpy("onSeleccionar");
    render(<FiltroCategorias categorias={categorias} seleccionada="Alimentos" onSeleccionar={onSeleccionar} />);

    fireEvent.click(screen.getByText("Juguetes"));
    fireEvent.click(screen.getByText("Todas"));

    expect(onSeleccionar.calls.allArgs()).toEqual([["Juguetes"], [""]]);
  });
});
