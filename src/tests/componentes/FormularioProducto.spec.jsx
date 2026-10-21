import { render, screen, fireEvent } from "@testing-library/react";
import FormularioProducto from "../../components/admin/FormularioProducto";
import { crearProducto } from "../ayudantes";

const categorias = [
  { id: 1, nombre: "Alimentos" },
  { id: 2, nombre: "Higiene" }
];

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
}

describe("FormularioProducto", () => {
  it("muestra los errores y no guarda si el formulario esta vacio", () => {
    const onGuardar = jasmine.createSpy("onGuardar");
    render(<FormularioProducto categorias={categorias} onGuardar={onGuardar} />);

    fireEvent.click(screen.getByRole("button", { name: "Guardar producto" }));

    expect(onGuardar).not.toHaveBeenCalled();
    expect(screen.getByText("El campo codigo es obligatorio.")).toBeTruthy();
    expect(screen.getByText("El campo Precio es obligatorio.")).toBeTruthy();
    expect(screen.getByText("Tienes que elegir una opcion en categoria.")).toBeTruthy();
  });

  it("valida numeros negativos y ofertas muy altas", () => {
    render(<FormularioProducto categorias={categorias} onGuardar={() => {}} />);

    escribir(/^Stock \*/, "-2");
    escribir("Oferta (%)", "95");
    fireEvent.click(screen.getByRole("button", { name: "Guardar producto" }));

    expect(screen.getByText("Stock no puede ser menor que 0.")).toBeTruthy();
    expect(screen.getByText("La oferta no puede ser mayor a 90%.")).toBeTruthy();
  });

  it("borra el error de un campo cuando el usuario lo corrige", () => {
    render(<FormularioProducto categorias={categorias} onGuardar={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Guardar producto" }));
    expect(screen.queryByText("El campo nombre es obligatorio.")).not.toBeNull();

    escribir(/^Nombre/, "Arena");

    expect(screen.queryByText("El campo nombre es obligatorio.")).toBeNull();
  });

  it("envia los datos convertidos a numero cuando todo es valido", () => {
    const onGuardar = jasmine.createSpy("onGuardar");
    render(<FormularioProducto categorias={categorias} onGuardar={onGuardar} textoBoton="Crear" />);

    escribir(/^Codigo/, "hi010");
    escribir(/^Nombre/, "  Arena sanitaria  ");
    escribir(/^Precio/, "8990");
    escribir(/^Stock \*/, "12");
    escribir(/^Categoria/, "Higiene");
    fireEvent.click(screen.getByRole("button", { name: "Crear" }));

    expect(onGuardar).toHaveBeenCalledTimes(1);
    const datos = onGuardar.calls.mostRecent().args[0];
    expect(datos.codigo).toBe("HI010");
    expect(datos.nombre).toBe("Arena sanitaria");
    expect(datos.precio).toBe(8990);
    expect(datos.stock).toBe(12);
    expect(datos.stockCritico).toBe(0);
    expect(datos.categoria).toBe("Higiene");
  });

  it("carga los valores del producto cuando se edita", () => {
    render(<FormularioProducto inicial={crearProducto({ oferta: 15 })} categorias={categorias} onGuardar={() => {}} />);

    expect(screen.getByLabelText(/^Nombre/).value).toBe("Alimento perro adulto 15kg");
    expect(screen.getByLabelText("Oferta (%)").value).toBe("15");
    expect(screen.getByLabelText(/^Categoria/).value).toBe("Alimentos");
  });

  it("llama a onCancelar al apretar Cancelar", () => {
    const onCancelar = jasmine.createSpy("onCancelar");
    render(<FormularioProducto categorias={categorias} onGuardar={() => {}} onCancelar={onCancelar} />);

    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onCancelar).toHaveBeenCalled();
  });
});
