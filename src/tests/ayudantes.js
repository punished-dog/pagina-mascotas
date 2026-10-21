export function crearProducto(cambios = {}) {
  return {
    id: 1,
    codigo: "AL001",
    nombre: "Alimento perro adulto 15kg",
    precio: 24990,
    oferta: 0,
    descripcion: "Alimento de prueba",
    categoria: "Alimentos",
    stock: 10,
    stockCritico: 5,
    imagen: "/fotos/producto1.png",
    ...cambios
  };
}

export function crearOrden(cambios = {}) {
  return {
    id: 2001,
    fecha: "2026-10-20T10:30:00",
    estado: "Pagada",
    cliente: { nombre: "Camila", apellidos: "Diaz Munoz", correo: "camila@gmail.com" },
    direccion: { calle: "Calle Arturo Prat 88", departamento: "", region: "Region de Valparaiso", comuna: "Vina del Mar", indicaciones: "" },
    items: [
      { id: 1, nombre: "Alimento perro adulto 15kg", precio: 24990, cantidad: 1, imagen: "/fotos/producto1.png" },
      { id: 4, nombre: "Pelota de goma resistente", precio: 2993, cantidad: 2, imagen: "/fotos/producto4.png" }
    ],
    cupon: "",
    subtotal: 30976,
    descuento: 0,
    despacho: 0,
    total: 30976,
    ...cambios
  };
}

export function simularLocalStorage(datosIniciales = {}) {
  const guardado = { ...datosIniciales };
  spyOn(localStorage, "getItem").and.callFake((clave) => (clave in guardado ? guardado[clave] : null));
  spyOn(localStorage, "setItem").and.callFake((clave, valor) => {
    guardado[clave] = String(valor);
  });
  spyOn(localStorage, "removeItem").and.callFake((clave) => {
    delete guardado[clave];
  });
  return guardado;
}

export const futuro = { v7_startTransition: true, v7_relativeSplatPath: true };
