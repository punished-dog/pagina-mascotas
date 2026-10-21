# GuauMiau - Tienda de mascotas

Proyecto de Desarrollo Fullstack II (DSY1104).

En la Evaluacion Parcial 1 la tienda estaba hecha con HTML, CSS y JavaScript
sin frameworks (queda guardada en el tag `entrega-1`). Para la Evaluacion
Parcial 2 se paso todo a **React** con **Bootstrap**, se agregaron vistas nuevas
y pruebas unitarias con **Jasmine** y **Karma**.

## Como ejecutarlo

Se necesita Node.js 18 o superior.

```
npm install
npm run dev
```

Despues se abre la direccion que muestra la consola (normalmente
http://localhost:5173).

Otros comandos:

| Comando | Para que sirve |
|---|---|
| `npm run build` | genera la version final en la carpeta `dist/` |
| `npm run preview` | levanta la version de `dist/` |
| `npm test` | corre las pruebas con Karma en Chrome sin ventana y genera la cobertura |

`npm test` necesita tener Google Chrome instalado. El reporte de cobertura queda
en `coverage/html/index.html` y el resumen en `coverage/cobertura.txt`.

## Tecnologias

- React 18 con Vite
- React Router para las rutas
- Bootstrap 5 y Bootstrap Icons para el diseño responsive
- Context API para el carrito y la sesion
- localStorage como base de datos simulada
- Jasmine, Karma y Testing Library para las pruebas

## Estructura

```
pagina-mascotas/
├── public/fotos/           imagenes de productos, blogs y logo
├── src/
│   ├── main.jsx            punto de entrada
│   ├── App.jsx             rutas de la tienda y del panel
│   ├── estilos.css         colores de la marca y ajustes sobre Bootstrap
│   ├── components/         componentes reutilizables (tarjeta, contador, aviso, boleta, ...)
│   │   └── admin/          layout, menu, formularios y modal del panel
│   ├── context/            CarritoContext y SesionContext
│   ├── hooks/              useAgregarAlCarrito
│   ├── data/               "base de datos" en localStorage con funciones CRUD
│   ├── utils/              validaciones, calculos del carrito, formatos y reportes
│   ├── pages/
│   │   ├── tienda/         vistas publicas
│   │   └── admin/          vistas del panel de administracion
│   └── tests/              pruebas unitarias (*.spec.jsx)
├── karma.conf.cjs          configuracion de Karma
└── vite.config.js
```

## Vistas

**Tienda**

| Ruta | Vista |
|---|---|
| `/` | Home con carrusel, categorias, mas vendidos y ofertas |
| `/productos` | Catalogo con buscador, filtro por categoria y orden |
| `/producto/:id` | Detalle del producto y productos relacionados |
| `/categorias` y `/categorias/:nombre` | Categorias y productos de una categoria |
| `/ofertas` | Productos con descuento |
| `/carrito` | Carrito con cupones y calculo de despacho |
| `/checkout` | Datos del cliente y direccion de entrega |
| `/compra/exito/:id` | Pago correcto con la boleta |
| `/compra/error/:id` | Pago rechazado con opcion de reintentar |
| `/login`, `/registro` | Inicio de sesion y registro |
| `/servicios`, `/nosotros`, `/blogs`, `/blogs/:id`, `/contacto` | Paginas informativas |

**Panel de administracion** (`/admin`)

| Ruta | Vista |
|---|---|
| `/admin` | Dashboard con ventas, stock critico y ultimas ordenes |
| `/admin/ordenes`, `/admin/ordenes/:id` | Listado de ordenes y boleta |
| `/admin/productos` | Listado con busqueda, filtro y CRUD |
| `/admin/productos/nuevo`, `/admin/productos/:id/editar`, `/admin/productos/:id` | Crear, editar y ver producto |
| `/admin/productos/criticos` | Productos con stock critico |
| `/admin/productos/reporte` | Reporte de productos vendidos (descarga CSV) |
| `/admin/categorias`, `/admin/categorias/nueva`, `/admin/categorias/:id/editar` | Mantenedor de categorias |
| `/admin/usuarios`, `/admin/usuarios/nuevo`, `/admin/usuarios/:run`, `/admin/usuarios/:run/editar` | Mantenedor de usuarios con historial de compras |
| `/admin/reportes` | Ventas por categoria, por producto y por dia con filtro de fechas |
| `/admin/perfil` | Datos del usuario conectado |

## Usuarios de prueba

| Correo | Contraseña | Perfil |
|---|---|---|
| admin@duoc.cl | admin123 | Administrador |
| vendedor@duoc.cl | vende123 | Vendedor |
| camila@gmail.com | cami2024 | Cliente |

- Cliente: compra en la tienda. Si intenta entrar al panel ve "Acceso restringido".
- Vendedor: en el panel ve el dashboard, las ordenes, los productos (sin poder
  crear, editar ni eliminar) y su perfil.
- Administrador: entra a todo el panel.

Los usuarios que se registran desde la tienda quedan como Cliente. Los otros
perfiles se crean desde el panel.

## Base de datos simulada

Los datos parten desde `src/data/datosIniciales.js` y la primera vez se copian
a localStorage. Desde ahi todos los cambios quedan guardados en el navegador.

| Clave | Contenido |
|---|---|
| `gm_productos` | productos |
| `gm_categorias` | categorias |
| `gm_usuarios` | usuarios |
| `gm_ordenes` | ordenes y boletas |
| `gm_carrito`, `gm_cupon` | carrito y cupon aplicado |
| `gm_sesion` | usuario conectado (sin contraseña) |

Para volver a los datos iniciales basta con borrar esas claves desde las
herramientas del navegador (Application > Local Storage).

## Reglas del carrito y la compra

- No se puede agregar mas cantidad que el stock del producto.
- La cantidad minima es 1, si baja de ahi el producto se elimina.
- El despacho cuesta $3.990 y es gratis en compras desde $30.000.
- Cupones: GUAUMIAU10 descuenta 10% y MASCOTA5 descuenta 5%.
- Para pagar hay que tener la sesion iniciada.
- Al pagar se crea la orden, se descuenta el stock y se vacia el carrito.
- En el checkout hay una casilla para simular un pago rechazado y probar la
  pagina de error. En ese caso la orden queda como Rechazada y el carrito no se
  borra.

## Validaciones

- Correo: obligatorio, maximo 100 caracteres y solo @duoc.cl, @profesor.duoc.cl
  o @gmail.com.
- Contraseña: entre 4 y 10 caracteres.
- Run: sin puntos ni guion, entre 7 y 9 caracteres y con el digito verificador
  calculado con modulo 11.
- Registro y usuarios: nombre (50), apellidos (100), direccion (300), region y
  comuna enlazadas y confirmacion de contraseña.
- Checkout: nombre, apellidos, correo, calle, region y comuna obligatorios.
- Producto: codigo minimo 3 caracteres y sin repetir, nombre (100), descripcion
  opcional (500), precio y stock enteros mayores o iguales a 0, oferta entre 0 y
  90% y categoria obligatoria.
- Categoria: nombre obligatorio y sin repetir.

Los errores aparecen debajo de cada campo al enviar el formulario y se borran
cuando el usuario corrige el campo.

## Pruebas

Las pruebas estan en `src/tests/`:

- `componentes/`: renderizado, props, estado y eventos de los componentes
  (TarjetaProducto, ListaProductos, Contador, Aviso, CampoTexto,
  FiltroCategorias, FormularioProducto, Boleta, RutaProtegida y los contextos).
- `logica/`: validaciones, calculos del carrito y reportes.
- `datos/`: funciones CRUD usando un localStorage simulado con `spyOn`.

Se usan espias de Jasmine (`jasmine.createSpy`) para revisar que los componentes
llamen a sus funciones con los datos correctos, y `jasmine.clock()` para probar
el aviso que se cierra solo.

## Pendiente para la proxima entrega

- Cambiar localStorage por una API con base de datos real.
