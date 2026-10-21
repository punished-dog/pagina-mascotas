export const correosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

export function validarCorreo(valor) {
  const correo = valor.trim().toLowerCase();
  if (correo === "") {
    return "Escribe tu correo.";
  }
  if (correo.length > 100) {
    return "El correo no puede tener mas de 100 caracteres.";
  }
  if (!correo.includes("@") || !correosPermitidos.some((dominio) => correo.endsWith(dominio))) {
    return "Solo aceptamos correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }
  return "";
}

export function validarPassword(valor, obligatoria = true) {
  if (valor === "") {
    return obligatoria ? "Escribe tu contraseña." : "";
  }
  if (valor.length < 4 || valor.length > 10) {
    return "La contraseña debe tener entre 4 y 10 caracteres.";
  }
  return "";
}

export function validarTexto(valor, maximo, obligatorio, nombreCampo) {
  const texto = valor.trim();
  if (obligatorio && texto === "") {
    return "El campo " + nombreCampo + " es obligatorio.";
  }
  if (texto.length > maximo) {
    return nombreCampo + " no puede superar los " + maximo + " caracteres.";
  }
  return "";
}

export function calcularDv(numero) {
  let suma = 0;
  let multiplo = 2;
  for (let i = numero.length - 1; i >= 0; i--) {
    suma += Number(numero.charAt(i)) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  if (resto === 11) {
    return "0";
  }
  if (resto === 10) {
    return "K";
  }
  return String(resto);
}

export function validarRun(valor) {
  const run = valor.trim().toUpperCase();
  if (run === "") {
    return "El run es obligatorio.";
  }
  if (run.includes(".") || run.includes("-")) {
    return "Escribe el run sin puntos ni guion, por ejemplo 19000015K.";
  }
  if (run.length < 7 || run.length > 9) {
    return "El run debe tener entre 7 y 9 caracteres.";
  }
  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);
  if (!/^[0-9]+$/.test(cuerpo)) {
    return "El run solo puede tener numeros y la K al final.";
  }
  if (calcularDv(cuerpo) !== dv) {
    return "El run no es valido, revisa el digito verificador.";
  }
  return "";
}

export function validarSeleccion(valor, nombreCampo) {
  if (valor === "" || valor === null || valor === undefined) {
    return "Tienes que elegir una opcion en " + nombreCampo + ".";
  }
  return "";
}

export function validarNumero(valor, minimo, entero, obligatorio, nombreCampo) {
  const texto = String(valor).trim();
  if (texto === "") {
    return obligatorio ? "El campo " + nombreCampo + " es obligatorio." : "";
  }
  const numero = Number(texto);
  if (isNaN(numero)) {
    return nombreCampo + " tiene que ser un numero.";
  }
  if (numero < minimo) {
    return nombreCampo + " no puede ser menor que " + minimo + ".";
  }
  if (entero && !Number.isInteger(numero)) {
    return nombreCampo + " tiene que ser un numero entero.";
  }
  return "";
}

export function sinErrores(errores) {
  return Object.values(errores).every((mensaje) => mensaje === "");
}

export function validarDatosCompra(datos) {
  return {
    nombre: validarTexto(datos.nombre, 50, true, "nombre"),
    apellidos: validarTexto(datos.apellidos, 100, true, "apellidos"),
    correo: validarCorreo(datos.correo),
    calle: validarTexto(datos.calle, 300, true, "calle"),
    departamento: validarTexto(datos.departamento, 50, false, "departamento"),
    region: validarSeleccion(datos.region, "region"),
    comuna: validarSeleccion(datos.comuna, "comuna"),
    indicaciones: validarTexto(datos.indicaciones, 300, false, "indicaciones")
  };
}

export function validarDatosUsuario(datos, esNuevo) {
  const errores = {
    run: esNuevo ? validarRun(datos.run) : "",
    nombre: validarTexto(datos.nombre, 50, true, "nombre"),
    apellidos: validarTexto(datos.apellidos, 100, true, "apellidos"),
    correo: validarCorreo(datos.correo),
    region: validarSeleccion(datos.region, "region"),
    comuna: validarSeleccion(datos.comuna, "comuna"),
    direccion: validarTexto(datos.direccion, 300, true, "direccion"),
    password: validarPassword(datos.password, esNuevo),
    confirmar: ""
  };
  if (datos.confirmar !== undefined && datos.password !== datos.confirmar) {
    errores.confirmar = "Las contraseñas no coinciden.";
  }
  return errores;
}

export function validarContacto(datos) {
  return {
    nombre: validarTexto(datos.nombre, 100, true, "nombre"),
    correo: validarCorreo(datos.correo),
    comentario: validarTexto(datos.comentario, 500, true, "comentario")
  };
}

export function validarProducto(datos) {
  const errores = {
    codigo: validarTexto(datos.codigo, 20, true, "codigo"),
    nombre: validarTexto(datos.nombre, 100, true, "nombre"),
    descripcion: validarTexto(datos.descripcion, 500, false, "descripcion"),
    precio: validarNumero(datos.precio, 0, true, true, "Precio"),
    oferta: validarNumero(datos.oferta, 0, true, false, "Oferta"),
    stock: validarNumero(datos.stock, 0, true, true, "Stock"),
    stockCritico: validarNumero(datos.stockCritico, 0, true, false, "Stock critico"),
    categoria: validarSeleccion(datos.categoria, "categoria")
  };
  if (errores.codigo === "" && datos.codigo.trim().length < 3) {
    errores.codigo = "El codigo debe tener al menos 3 caracteres.";
  }
  if (errores.oferta === "" && Number(datos.oferta) > 90) {
    errores.oferta = "La oferta no puede ser mayor a 90%.";
  }
  return errores;
}

export function validarCategoria(datos) {
  return {
    nombre: validarTexto(datos.nombre, 50, true, "nombre"),
    descripcion: validarTexto(datos.descripcion, 300, false, "descripcion")
  };
}
