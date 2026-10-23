import {
  validarCorreo,
  validarPassword,
  validarRun,
  calcularDv,
  validarTexto,
  validarNumero,
  validarSeleccion,
  validarDatosCompra,
  validarDatosUsuario,
  sinErrores
} from "../../utils/validaciones";

describe("validaciones", () => {
  describe("validarCorreo", () => {
    it("acepta los dominios permitidos sin importar mayusculas", () => {
      expect(validarCorreo("camila@gmail.com")).toBe("");
      expect(validarCorreo("ANA@DUOC.CL")).toBe("");
      expect(validarCorreo("profe@profesor.duoc.cl")).toBe("");
    });

    it("rechaza correos vacios o de otros dominios", () => {
      expect(validarCorreo("   ")).toBe("Escribe tu correo.");
      expect(validarCorreo("pedro@yahoo.com")).toContain("Solo aceptamos");
      expect(validarCorreo("gmail.com")).toContain("Solo aceptamos");
    });
  });

  describe("validarRun", () => {
    it("calcula el digito verificador, incluida la K y el 0", () => {
      expect(calcularDv("19000015")).toBe("K");
      expect(calcularDv("12345678")).toBe("5");
      expect(calcularDv("11111111")).toBe("1");
    });

    it("acepta runs validos con k minuscula", () => {
      expect(validarRun("19000015k")).toBe("");
      expect(validarRun("123456785")).toBe("");
    });

    it("rechaza runs con puntos, largo incorrecto, letras o mal digito", () => {
      expect(validarRun("")).toBe("El run es obligatorio.");
      expect(validarRun("12.345.678-5")).toContain("sin puntos ni guion");
      expect(validarRun("12345")).toContain("entre 7 y 9");
      expect(validarRun("12A456785")).toContain("solo puede tener numeros");
      expect(validarRun("123456789")).toContain("digito verificador");
    });
  });

  it("valida el largo de la contraseña y si es obligatoria", () => {
    expect(validarPassword("abc")).toContain("entre 4 y 10");
    expect(validarPassword("abcdefghijk")).toContain("entre 4 y 10");
    expect(validarPassword("abcd")).toBe("");
    expect(validarPassword("")).toBe("Escribe tu contraseña.");
    expect(validarPassword("", false)).toBe("");
  });

  it("valida textos obligatorios y su largo maximo", () => {
    expect(validarTexto("  ", 10, true, "nombre")).toBe("El campo nombre es obligatorio.");
    expect(validarTexto("", 10, false, "nombre")).toBe("");
    expect(validarTexto("abcdefghijk", 10, true, "nombre")).toBe("nombre no puede superar los 10 caracteres.");
  });

  it("valida numeros, minimos y enteros", () => {
    expect(validarNumero("abc", 0, true, true, "Precio")).toBe("Precio tiene que ser un numero.");
    expect(validarNumero("-1", 0, true, true, "Precio")).toBe("Precio no puede ser menor que 0.");
    expect(validarNumero("2.5", 0, true, true, "Stock")).toBe("Stock tiene que ser un numero entero.");
    expect(validarNumero("", 0, true, false, "Oferta")).toBe("");
    expect(validarNumero("10", 0, true, true, "Stock")).toBe("");
  });

  it("pide elegir una opcion en los select", () => {
    expect(validarSeleccion("", "region")).toBe("Tienes que elegir una opcion en region.");
    expect(validarSeleccion("Region de Valparaiso", "region")).toBe("");
  });

  it("revisa todos los campos del checkout de una vez", () => {
    const errores = validarDatosCompra({
      nombre: "",
      apellidos: "Rojas",
      correo: "luis@gmail.com",
      calle: "",
      departamento: "",
      region: "",
      comuna: "",
      indicaciones: ""
    });

    expect(errores.nombre).not.toBe("");
    expect(errores.calle).not.toBe("");
    expect(errores.region).not.toBe("");
    expect(errores.apellidos).toBe("");
    expect(sinErrores(errores)).toBeFalse();
  });

  it("detecta contraseñas distintas en el registro y no pide run al editar", () => {
    const datos = {
      run: "",
      nombre: "Luis",
      apellidos: "Rojas",
      correo: "luis@gmail.com",
      region: "Region Metropolitana de Santiago",
      comuna: "Santiago",
      direccion: "Pasaje 4",
      password: "abcd",
      confirmar: "abce"
    };

    expect(validarDatosUsuario(datos, false).confirmar).toBe("Las contraseñas no coinciden.");
    expect(validarDatosUsuario({ ...datos, confirmar: "abcd" }, false).run).toBe("");
    expect(sinErrores(validarDatosUsuario({ ...datos, confirmar: "abcd" }, false))).toBeTrue();
    expect(validarDatosUsuario(datos, true).run).toBe("El run es obligatorio.");
  });
});
