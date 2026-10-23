import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Contador from "../../components/Contador";

function ContadorConEstado({ inicial, maximo }) {
  const [valor, setValor] = useState(inicial);
  return <Contador valor={valor} minimo={1} maximo={maximo} onCambiar={setValor} />;
}

describe("Contador", () => {
  it("muestra el valor recibido", () => {
    render(<Contador valor={3} onCambiar={() => {}} />);

    expect(screen.getByLabelText("Cantidad").textContent).toBe("3");
  });

  it("llama a onCambiar con el valor siguiente y el anterior", () => {
    const onCambiar = jasmine.createSpy("onCambiar");
    render(<Contador valor={3} maximo={10} onCambiar={onCambiar} />);

    fireEvent.click(screen.getByLabelText("Sumar"));
    fireEvent.click(screen.getByLabelText("Restar"));

    expect(onCambiar.calls.allArgs()).toEqual([[4], [2]]);
  });

  it("deshabilita los botones al llegar al minimo y al maximo", () => {
    const { rerender } = render(<Contador valor={1} maximo={5} onCambiar={() => {}} />);
    expect(screen.getByLabelText("Restar").disabled).toBeTrue();
    expect(screen.getByLabelText("Sumar").disabled).toBeFalse();

    rerender(<Contador valor={5} maximo={5} onCambiar={() => {}} />);
    expect(screen.getByLabelText("Sumar").disabled).toBeTrue();
  });

  it("actualiza el estado del padre y no pasa del stock maximo", () => {
    render(<ContadorConEstado inicial={1} maximo={3} />);
    const sumar = screen.getByLabelText("Sumar");

    fireEvent.click(sumar);
    fireEvent.click(sumar);
    fireEvent.click(sumar);

    expect(screen.getByLabelText("Cantidad").textContent).toBe("3");
    expect(sumar.disabled).toBeTrue();
  });
});
