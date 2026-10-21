import { render, screen, fireEvent } from "@testing-library/react";
import CampoTexto from "../../components/CampoTexto";

describe("CampoTexto", () => {
  it("asocia la etiqueta con el input y marca los campos obligatorios", () => {
    render(<CampoTexto id="nombre" etiqueta="Nombre" obligatorio valor="" onCambiar={() => {}} />);

    const input = screen.getByLabelText(/Nombre/);
    expect(input.id).toBe("nombre");
    expect(screen.getByText("*")).toBeTruthy();
  });

  it("muestra el texto de ayuda cuando no hay error", () => {
    render(<CampoTexto id="correo" etiqueta="Correo" valor="" onCambiar={() => {}} ayuda="Solo gmail o duoc" />);

    expect(screen.getByText("Solo gmail o duoc")).toBeTruthy();
  });

  it("muestra el error y oculta la ayuda cuando el error llega por props", () => {
    render(
      <CampoTexto id="correo" etiqueta="Correo" valor="x" onCambiar={() => {}} ayuda="Solo gmail o duoc" error="Correo invalido" />
    );

    const input = screen.getByLabelText("Correo");
    expect(screen.getByText("Correo invalido")).toBeTruthy();
    expect(screen.queryByText("Solo gmail o duoc")).toBeNull();
    expect(input.className).toContain("is-invalid");
    expect(input.getAttribute("aria-invalid")).toBe("true");
  });

  it("avisa al padre con el id y el texto escrito", () => {
    const onCambiar = jasmine.createSpy("onCambiar");
    render(<CampoTexto id="apellidos" etiqueta="Apellidos" valor="" onCambiar={onCambiar} />);

    fireEvent.change(screen.getByLabelText("Apellidos"), { target: { value: "Rojas" } });

    expect(onCambiar).toHaveBeenCalledWith("apellidos", "Rojas");
  });

  it("renderiza un textarea cuando es multilinea", () => {
    render(<CampoTexto id="comentario" etiqueta="Comentario" valor="hola" onCambiar={() => {}} multilinea />);

    expect(screen.getByLabelText("Comentario").tagName).toBe("TEXTAREA");
  });
});
