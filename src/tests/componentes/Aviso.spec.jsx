import { render, screen, fireEvent } from "@testing-library/react";
import Aviso from "../../components/Aviso";

describe("Aviso", () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("no renderiza nada si no hay mensaje", () => {
    const { container } = render(<Aviso mensaje="" onCerrar={() => {}} />);

    expect(container.innerHTML).toBe("");
  });

  it("muestra el mensaje con color oscuro o rojo segun el tipo", () => {
    const { rerender } = render(<Aviso mensaje="Producto agregado" onCerrar={() => {}} />);
    expect(screen.getByRole("status").className).toContain("text-bg-dark");

    rerender(<Aviso mensaje="Sin stock" tipo="error" onCerrar={() => {}} />);
    expect(screen.getByText("Sin stock")).toBeTruthy();
    expect(screen.getByRole("status").className).toContain("text-bg-danger");
  });

  it("llama a onCerrar al apretar la X", () => {
    const onCerrar = jasmine.createSpy("onCerrar");
    render(<Aviso mensaje="Hola" onCerrar={onCerrar} />);

    fireEvent.click(screen.getByLabelText("Cerrar aviso"));

    expect(onCerrar).toHaveBeenCalled();
  });

  it("se cierra solo despues de la duracion indicada", () => {
    const onCerrar = jasmine.createSpy("onCerrar");
    render(<Aviso mensaje="Hola" onCerrar={onCerrar} duracion={1000} />);

    jasmine.clock().tick(999);
    expect(onCerrar).not.toHaveBeenCalled();

    jasmine.clock().tick(1);
    expect(onCerrar).toHaveBeenCalledTimes(1);
  });
});
