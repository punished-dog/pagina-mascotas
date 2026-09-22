# GuauMiau - Tienda de mascotas

Proyecto de la Evaluacion Parcial 1 de Desarrollo Fullstack II (DSY1104).
Es una tienda online hecha con HTML5, CSS y JavaScript, sin frameworks.

Incluye la tienda publica y el panel de administracion, en la carpeta `admin/`.

## Como ejecutarlo

Se abre `pets.html` directamente en el navegador. Para que el localStorage
funcione bien conviene levantarlo con un servidor local, por ejemplo con la
extension Live Server de Visual Studio Code.

## Estructura

```
pagina-mascotas/
├── pets.html              home de la tienda
├── productos.html         listado con filtro por categoria
├── detalle-producto.html  detalle del producto (?id=1)
├── carrito.html           carrito de compras
├── registro.html          registro de usuario
├── login.html             inicio de sesion
├── nosotros.html          informacion de la tienda
├── servicios.html         servicios del local
├── blogs.html             listado de blogs
├── blog1.html, blog2.html detalle de cada blog
├── contacto.html          formulario de contacto
├── admin/                 panel de administracion
│   ├── home.html
│   ├── productos.html, producto-nuevo.html, producto-editar.html, producto-ver.html
│   └── usuarios.html, usuario-nuevo.html, usuario-editar.html
├── css/
│   ├── estilos.css        estilos generales
│   ├── responsive.css     media queries para tablet y celular
│   └── admin.css          estilos del panel
├── js/
│   ├── productos.js       arreglo de productos y funciones para mostrarlos
│   ├── carrito.js         carrito con localStorage
│   ├── validaciones.js    validaciones de los formularios
│   ├── regiones.js        arreglo de regiones y comunas
│   ├── sesion.js          usuarios, roles y sesion
│   └── admin.js           mantenedor de productos y usuarios
└── fotos/                 imagenes del sitio
```

## Usuarios de prueba

| Correo | Contraseña | Perfil |
|---|---|---|
| admin@duoc.cl | admin123 | Administrador |
| vendedor@duoc.cl | vende123 | Vendedor |
| camila@gmail.com | cami2024 | Cliente |

Los perfiles funcionan asi:

- Cliente: compra en la tienda.
- Administrador: entra a todo el panel.
- Vendedor: en el panel solo ve el listado y el detalle de los productos, el
  resto de las opciones se esconden.

Al administrador y al vendedor les aparece el enlace al panel en la barra de
sesion, y al iniciar sesion se les manda directo a `admin/home.html`.

Los usuarios que se crean desde `registro.html` quedan siempre como Cliente. Los
otros perfiles se crean desde el panel de administracion.

## Validaciones

- Correo: obligatorio, maximo 100 caracteres y solo @duoc.cl, @profesor.duoc.cl
  o @gmail.com.
- Contraseña: entre 4 y 10 caracteres.
- Contacto: nombre obligatorio (100), comentario obligatorio (500).
- Registro: run sin puntos ni guion entre 7 y 9 caracteres y con el digito
  verificador calculado con modulo 11, nombre (50), apellidos (100), direccion
  (300), region y comuna enlazadas, confirmacion de contraseña, fecha de
  nacimiento opcional.
- Producto (panel): codigo minimo 3 caracteres, nombre (100), descripcion
  opcional (500), precio mayor o igual a 0 y puede tener decimales, stock entero
  mayor o igual a 0, stock critico opcional y categoria obligatoria.

Todas se revisan mientras el usuario escribe y otra vez al enviar el formulario.

## Reglas del carrito

- No se puede agregar mas cantidad que el stock del producto.
- La cantidad minima es 1, si baja de ahi el producto se elimina.
- El despacho cuesta $3.990 y es gratis en compras desde $30.000.
- Cupones: GUAUMIAU10 descuenta 10% y MASCOTA5 descuenta 5%.
- Para pagar hay que tener la sesion iniciada.

El carrito se guarda en localStorage con la clave `carrito`, los productos que
edita el administrador en `productos` y los usuarios en `usuarios`.

## Pendiente para las proximas entregas

- Conectar el sistema a una base de datos en vez de localStorage.
