# GuauMiau - Tienda de mascotas

Proyecto de la Evaluacion Parcial 1 de Desarrollo Fullstack II (DSY1104).
Es una tienda online hecha con HTML5, CSS y JavaScript, sin frameworks.

El panel de administracion ya no esta en este repositorio, se movio a
`pagina-mascotas-admin`.

## Como ejecutarlo

Se abre `pets.html` directamente en el navegador. Para que el localStorage
funcione bien conviene levantarlo con un servidor local, por ejemplo con la
extension Live Server de Visual Studio Code.

## Enlace con el panel de administracion

La ruta hacia el panel esta en `js/config.js`:

```js
var URL_ADMIN = "../pagina-mascotas-admin/index.html";
```

El valor por defecto asume que los dos repositorios estan clonados uno al lado
del otro y que Live Server se levanta en la carpeta que los contiene:

```
carpeta-del-proyecto/
├── pagina-mascotas/
└── pagina-mascotas-admin/
```

Si se publican en otra parte (por ejemplo GitHub Pages), hay que cambiar esa ruta
por la direccion completa del panel, y en el repositorio del panel cambiar
`URL_TIENDA` y `URL_LOGIN` de la misma forma.

Importante: el localStorage no se comparte entre dominios distintos. Si la tienda
y el panel quedan en direcciones diferentes, cada uno tendra su propia copia de
los usuarios y los productos.

## Estructura

```
pagina-mascotas/
├── pets.html              home de la tienda
├── productos.html         listado con filtro por categoria
├── detalle-producto.html  detalle del producto (?id=1)
├── carrito.html           carrito de compras
├── registro.html          registro de usuario
├── login.html             inicio de sesion
├── nosotros.html          informacion de la tienda y del equipo
├── servicios.html         servicios del local
├── blogs.html             listado de blogs
├── blog1.html, blog2.html detalle de cada blog
├── contacto.html          formulario de contacto
├── css/
│   ├── estilos.css        estilos generales
│   └── responsive.css     media queries para tablet y celular
├── js/
│   ├── config.js          ruta hacia el panel de administracion
│   ├── productos.js       arreglo de productos y funciones para mostrarlos
│   ├── carrito.js         carrito con localStorage
│   ├── validaciones.js    validaciones de los formularios
│   ├── regiones.js        arreglo de regiones y comunas
│   └── sesion.js          usuarios, roles y sesion
└── fotos/                 imagenes del sitio (falta subir las definitivas)
```

## Usuarios de prueba

| Correo | Contraseña | Perfil |
|---|---|---|
| admin@duoc.cl | admin123 | Administrador |
| vendedor@duoc.cl | vende123 | Vendedor |
| camila@gmail.com | cami2024 | Cliente |

Los perfiles funcionan asi:

- Cliente: compra en la tienda.
- Administrador y Vendedor: ademas les aparece el enlace al panel en la barra de
  sesion, y al iniciar sesion se les manda directo al panel.

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

Todas se revisan mientras el usuario escribe y otra vez al enviar el formulario.

## Reglas del carrito

- No se puede agregar mas cantidad que el stock del producto.
- La cantidad minima es 1, si baja de ahi el producto se elimina.
- El despacho cuesta $3.990 y es gratis en compras sobre $30.000.
- Cupones: GUAUMIAU10 descuenta 10% y MASCOTA5 descuenta 5%.
- Para pagar hay que tener la sesion iniciada.

El carrito se guarda en localStorage con la clave `carrito`, los productos que
edita el administrador en `productos` y los usuarios en `usuarios`.

## Pendiente para las proximas entregas

- Subir las fotos definitivas: el logo, las ocho imagenes de los productos y las
  dos de los blogs. Las etiquetas img ya apuntan a esos nombres dentro de
  `fotos/`, asi que solo falta dejar los archivos ahi.
- Cambiar el video de la pagina Nosotros.
- Conectar el sistema a una base de datos en vez de localStorage.
