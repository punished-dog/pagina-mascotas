export const productosIniciales = [
  {
    id: 1,
    codigo: "AL001",
    nombre: "Alimento perro adulto 15kg",
    precio: 24990,
    oferta: 0,
    descripcion: "Alimento completo para perros adultos de razas medianas y grandes. Con pollo y arroz, ayuda a mantener el pelaje sano y una buena digestion.",
    categoria: "Alimentos",
    stock: 20,
    stockCritico: 5,
    imagen: "/fotos/producto1.png"
  },
  {
    id: 2,
    codigo: "AL002",
    nombre: "Alimento gato adulto 10kg",
    precio: 19990,
    oferta: 10,
    descripcion: "Alimento seco para gatos adultos. Formula con pescado que ayuda al control de bolas de pelo.",
    categoria: "Alimentos",
    stock: 15,
    stockCritico: 5,
    imagen: "/fotos/producto2.png"
  },
  {
    id: 3,
    codigo: "CA001",
    nombre: "Cama grande acolchada",
    precio: 29990,
    oferta: 0,
    descripcion: "Cama de 90x70 cm con relleno acolchado y funda lavable. Ideal para perros medianos y grandes.",
    categoria: "Accesorios",
    stock: 8,
    stockCritico: 3,
    imagen: "/fotos/producto3.png"
  },
  {
    id: 4,
    codigo: "JU001",
    nombre: "Pelota de goma resistente",
    precio: 3990,
    oferta: 25,
    descripcion: "Pelota de goma natural que rebota y flota en el agua. Sirve para juegos de buscar y para masajear las encias.",
    categoria: "Juguetes",
    stock: 40,
    stockCritico: 10,
    imagen: "/fotos/producto4.png"
  },
  {
    id: 5,
    codigo: "CO001",
    nombre: "Collar antipulgas",
    precio: 8990,
    oferta: 0,
    descripcion: "Collar con proteccion de hasta 4 meses contra pulgas y garrapatas. Ajustable para perros y gatos.",
    categoria: "Higiene",
    stock: 12,
    stockCritico: 4,
    imagen: "/fotos/producto5.png"
  },
  {
    id: 6,
    codigo: "CO002",
    nombre: "Correa retractil 5 metros",
    precio: 12990,
    oferta: 20,
    descripcion: "Correa retractil con freno y boton de bloqueo. Soporta mascotas de hasta 25 kilos.",
    categoria: "Accesorios",
    stock: 10,
    stockCritico: 3,
    imagen: "/fotos/producto6.png"
  },
  {
    id: 7,
    codigo: "RA001",
    nombre: "Rascador para gato",
    precio: 34990,
    oferta: 0,
    descripcion: "Rascador de tres niveles con cuerda de sisal y una casita en la base. Ayuda a que el gato no rasguñe los muebles.",
    categoria: "Juguetes",
    stock: 3,
    stockCritico: 4,
    imagen: "/fotos/producto7.png"
  },
  {
    id: 8,
    codigo: "SH001",
    nombre: "Shampoo para mascotas 500ml",
    precio: 5990,
    oferta: 15,
    descripcion: "Shampoo hipoalergenico con avena, apto para perros y gatos desde los 3 meses.",
    categoria: "Higiene",
    stock: 25,
    stockCritico: 8,
    imagen: "/fotos/producto8.png"
  }
];

export const categoriasIniciales = [
  {
    id: 1,
    nombre: "Alimentos",
    descripcion: "Alimento seco para perros y gatos de todas las edades.",
    imagen: "/fotos/producto1.png"
  },
  {
    id: 2,
    nombre: "Juguetes",
    descripcion: "Pelotas, rascadores y juguetes para que tu mascota se entretenga.",
    imagen: "/fotos/producto4.png"
  },
  {
    id: 3,
    nombre: "Accesorios",
    descripcion: "Camas, correas y todo lo necesario para el dia a dia.",
    imagen: "/fotos/producto3.png"
  },
  {
    id: 4,
    nombre: "Higiene",
    descripcion: "Shampoo, collares antipulgas y cuidado del pelaje.",
    imagen: "/fotos/producto8.png"
  }
];

export const usuariosIniciales = [
  {
    run: "190110222",
    nombre: "Ana",
    apellidos: "Soto Perez",
    correo: "admin@duoc.cl",
    password: "admin123",
    fechaNacimiento: "1995-04-12",
    tipo: "Administrador",
    region: "Region Metropolitana de Santiago",
    comuna: "Puente Alto",
    direccion: "Av. Don Ramon 1234"
  },
  {
    run: "123456785",
    nombre: "Pedro",
    apellidos: "Gonzalez Rojas",
    correo: "vendedor@duoc.cl",
    password: "vende123",
    fechaNacimiento: "1999-08-02",
    tipo: "Vendedor",
    region: "Region Metropolitana de Santiago",
    comuna: "Maipu",
    direccion: "Los Alerces 45"
  },
  {
    run: "111111111",
    nombre: "Camila",
    apellidos: "Diaz Munoz",
    correo: "camila@gmail.com",
    password: "cami2024",
    fechaNacimiento: "2001-01-20",
    tipo: "Cliente",
    region: "Region de Valparaiso",
    comuna: "Vina del Mar",
    direccion: "Calle Arturo Prat 88"
  }
];

export const ordenesIniciales = [
  {
    id: 1001,
    fecha: "2026-10-06T11:20:00",
    estado: "Pagada",
    cliente: { nombre: "Camila", apellidos: "Diaz Munoz", correo: "camila@gmail.com" },
    direccion: {
      calle: "Calle Arturo Prat 88",
      departamento: "",
      region: "Region de Valparaiso",
      comuna: "Vina del Mar",
      indicaciones: ""
    },
    items: [
      { id: 1, nombre: "Alimento perro adulto 15kg", precio: 24990, cantidad: 1, imagen: "/fotos/producto1.png" },
      { id: 4, nombre: "Pelota de goma resistente", precio: 2993, cantidad: 2, imagen: "/fotos/producto4.png" }
    ],
    cupon: "",
    subtotal: 30976,
    descuento: 0,
    despacho: 0,
    total: 30976
  },
  {
    id: 1002,
    fecha: "2026-10-11T18:45:00",
    estado: "Pagada",
    cliente: { nombre: "Camila", apellidos: "Diaz Munoz", correo: "camila@gmail.com" },
    direccion: {
      calle: "Calle Arturo Prat 88",
      departamento: "",
      region: "Region de Valparaiso",
      comuna: "Vina del Mar",
      indicaciones: "Dejar en conserjeria"
    },
    items: [
      { id: 8, nombre: "Shampoo para mascotas 500ml", precio: 5092, cantidad: 1, imagen: "/fotos/producto8.png" }
    ],
    cupon: "",
    subtotal: 5092,
    descuento: 0,
    despacho: 3990,
    total: 9082
  },
  {
    id: 1003,
    fecha: "2026-10-15T09:10:00",
    estado: "Pagada",
    cliente: { nombre: "Luis", apellidos: "Rojas Vera", correo: "luis@gmail.com" },
    direccion: {
      calle: "Los Olmos 22",
      departamento: "Depto 41",
      region: "Region Metropolitana de Santiago",
      comuna: "Providencia",
      indicaciones: ""
    },
    items: [
      { id: 7, nombre: "Rascador para gato", precio: 34990, cantidad: 1, imagen: "/fotos/producto7.png" },
      { id: 2, nombre: "Alimento gato adulto 10kg", precio: 17991, cantidad: 1, imagen: "/fotos/producto2.png" }
    ],
    cupon: "GUAUMIAU10",
    subtotal: 52981,
    descuento: 5298,
    despacho: 0,
    total: 47683
  }
];
