import { crearUsuario, actualizarUsuario, validarCredenciales, eliminarUsuario } from "../../data/usuarios";
import { crearOrden as guardarOrden, ordenesDeCliente, listarOrdenes } from "../../data/ordenes";
import { crearCategoria, eliminarCategoria, actualizarCategoria } from "../../data/categorias";
import { simularLocalStorage, crearOrden, crearProducto } from "../ayudantes";

const ana = { run: "190110222", nombre: "Ana", correo: "admin@duoc.cl", password: "admin123", tipo: "Administrador" };

describe("datos de usuarios, ordenes y categorias (localStorage simulado)", () => {
  let guardado;

  beforeEach(() => {
    guardado = simularLocalStorage({ gm_usuarios: JSON.stringify([ana]) });
  });

  it("no deja registrar un run o correo repetido", () => {
    expect(crearUsuario({ ...ana, correo: "otra@gmail.com" }).error).toBe("Ese run ya esta registrado.");
    expect(crearUsuario({ ...ana, run: "19000015K", correo: "ADMIN@duoc.cl" }).error).toContain("correo");

    const resultado = crearUsuario({ run: "19000015K", nombre: "Luis", correo: "luis@gmail.com", password: "luis1", tipo: "Cliente" });
    expect(resultado.ok).toBeTrue();
    expect(JSON.parse(guardado.gm_usuarios).length).toBe(2);
  });

  it("valida credenciales sin importar mayusculas en el correo", () => {
    expect(validarCredenciales("Admin@Duoc.cl", "admin123").nombre).toBe("Ana");
    expect(validarCredenciales("admin@duoc.cl", "mala")).toBeNull();
    expect(validarCredenciales("nadie@gmail.com", "admin123")).toBeNull();
  });

  it("mantiene la contraseña si al editar viene vacia", () => {
    const resultado = actualizarUsuario("190110222", { nombre: "Ana Maria", password: "" });

    expect(resultado.usuario.nombre).toBe("Ana Maria");
    expect(resultado.usuario.password).toBe("admin123");
    expect(actualizarUsuario("1", {}).ok).toBeFalse();
    expect(eliminarUsuario("190110222")).toBeTrue();
  });

  it("guarda una orden nueva con numero correlativo y la filtra por cliente", () => {
    guardado.gm_ordenes = JSON.stringify([crearOrden({ id: 1003 })]);

    const nueva = guardarOrden({ ...crearOrden(), id: undefined, cliente: { nombre: "Luis", apellidos: "Rojas", correo: "luis@gmail.com" } });

    expect(nueva.id).toBe(1004);
    expect(nueva.fecha.length).toBe(19);
    expect(listarOrdenes().length).toBe(2);
    expect(ordenesDeCliente("LUIS@gmail.com").map((o) => o.id)).toEqual([1004]);
  });

  it("no elimina categorias con productos y renombra la categoria de sus productos", () => {
    guardado.gm_categorias = JSON.stringify([{ id: 1, nombre: "Higiene", descripcion: "", imagen: "" }]);
    guardado.gm_productos = JSON.stringify([crearProducto({ categoria: "Higiene" })]);

    expect(eliminarCategoria(1)).toBeFalse();

    actualizarCategoria(1, { nombre: "Cuidado" });
    expect(JSON.parse(guardado.gm_productos)[0].categoria).toBe("Cuidado");

    const vacia = crearCategoria({ nombre: "Snacks", descripcion: "", imagen: "" });
    expect(vacia.id).toBe(2);
    expect(eliminarCategoria(vacia.id)).toBeTrue();
  });
});
