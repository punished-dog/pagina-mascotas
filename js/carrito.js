var COSTO_DESPACHO = 3990;
var MONTO_DESPACHO_GRATIS = 30000;

function obtenerCarrito() {
    var datos = localStorage.getItem("carrito");
    if (datos == null) {
        return [];
    }
    return JSON.parse(datos);
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id, cantidad) {
    var producto = buscarProducto(id);
    if (producto == null) {
        return;
    }

    if (producto.stock <= 0) {
        alert("Este producto esta sin stock por el momento.");
        return;
    }

    var carrito = obtenerCarrito();
    var encontrado = false;

    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id == id) {
            encontrado = true;
            if (carrito[i].cantidad + cantidad > producto.stock) {
                alert("Solo quedan " + producto.stock + " unidades de " + producto.nombre + ".");
                return;
            }
            carrito[i].cantidad = carrito[i].cantidad + cantidad;
        }
    }

    if (encontrado == false) {
        if (cantidad > producto.stock) {
            alert("Solo quedan " + producto.stock + " unidades de " + producto.nombre + ".");
            return;
        }
        carrito.push({ id: id, cantidad: cantidad });
    }

    guardarCarrito(carrito);
    actualizarContador();
    avisarAgregado(producto.nombre);
}

function avisarAgregado(nombre) {
    var caja = document.getElementById("avisoCarrito");
    if (caja == null) {
        return;
    }
    caja.textContent = nombre + " se agrego al carrito";
    caja.style.display = "block";
    setTimeout(function () {
        caja.style.display = "none";
    }, 2500);
}

function cambiarCantidad(id, cambio) {
    var carrito = obtenerCarrito();
    var producto = buscarProducto(id);

    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id == id) {
            var nueva = carrito[i].cantidad + cambio;

            if (nueva < 1) {
                eliminarDelCarrito(id);
                return;
            }

            if (producto != null && nueva > producto.stock) {
                alert("No hay mas stock de este producto.");
                return;
            }

            carrito[i].cantidad = nueva;
        }
    }

    guardarCarrito(carrito);
    mostrarCarrito();
    actualizarContador();
}

function eliminarDelCarrito(id) {
    var carrito = obtenerCarrito();
    var nuevo = [];

    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id != id) {
            nuevo.push(carrito[i]);
        }
    }

    guardarCarrito(nuevo);
    mostrarCarrito();
    actualizarContador();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    localStorage.removeItem("cupon");
    mostrarCarrito();
    actualizarContador();
}

function actualizarContador() {
    var carrito = obtenerCarrito();
    var total = 0;

    for (var i = 0; i < carrito.length; i++) {
        total = total + carrito[i].cantidad;
    }

    var contador = document.getElementById("contadorCarrito");
    if (contador != null) {
        contador.textContent = total;
    }
}

function mostrarCarrito() {
    var contenedor = document.getElementById("listaCarrito");
    if (contenedor == null) {
        return;
    }

    var carrito = obtenerCarrito();

    if (carrito.length == 0) {
        contenedor.innerHTML = "<p>Tu carrito esta vacio. <a href='productos.html'>Ver productos</a></p>";
        mostrarResumen(0);
        return;
    }

    var html = "";
    var subtotal = 0;

    for (var i = 0; i < carrito.length; i++) {
        var p = buscarProducto(carrito[i].id);
        if (p == null) {
            continue;
        }

        var cantidad = carrito[i].cantidad;
        subtotal = subtotal + p.precio * cantidad;

        html += "<div class='linea-carrito'>";
        html += "<img src='" + p.imagen + "' alt='" + p.nombre + "'>";
        html += "<div class='linea-datos'>";
        html += "<h3>" + p.nombre + "</h3>";
        html += "<p class='precio'>" + precioProducto(p.precio) + "</p>";
        html += "<div class='cantidad'>";
        html += "<button class='boton-gris' onclick='cambiarCantidad(" + p.id + ", -1)'>-</button>";
        html += "<span>" + cantidad + "</span>";
        html += "<button class='boton-gris' onclick='cambiarCantidad(" + p.id + ", 1)'>+</button>";
        html += "<button class='boton-rojo' onclick='eliminarDelCarrito(" + p.id + ")'>Quitar</button>";
        html += "</div>";
        html += "</div>";
        html += "<div><strong>" + formatoPrecio(p.precio * cantidad) + "</strong></div>";
        html += "</div>";
    }

    contenedor.innerHTML = html;
    mostrarResumen(subtotal);
}

function mostrarResumen(subtotal) {
    var cupon = localStorage.getItem("cupon");
    var descuento = 0;

    if (cupon == "PATITAS10") {
        descuento = Math.round(subtotal * 0.1);
    }
    if (cupon == "MASCOTA5") {
        descuento = Math.round(subtotal * 0.05);
    }

    var despacho = 0;
    if (subtotal > 0 && subtotal < MONTO_DESPACHO_GRATIS) {
        despacho = COSTO_DESPACHO;
    }

    var total = subtotal - descuento + despacho;

    document.getElementById("subtotal").textContent = formatoPrecio(subtotal);
    document.getElementById("descuento").textContent = "-" + formatoPrecio(descuento);
    document.getElementById("despacho").textContent = despacho == 0 ? "Gratis" : formatoPrecio(despacho);
    document.getElementById("totalCarrito").textContent = formatoPrecio(total);
}

function aplicarCupon() {
    var codigo = document.getElementById("cupon").value.trim().toUpperCase();
    var mensaje = document.getElementById("mensajeCupon");

    if (codigo == "PATITAS10" || codigo == "MASCOTA5") {
        localStorage.setItem("cupon", codigo);
        mensaje.textContent = "Cupon aplicado.";
        mensaje.className = "aviso";
    } else {
        localStorage.removeItem("cupon");
        mensaje.textContent = "El cupon " + codigo + " no existe o ya vencio.";
        mensaje.className = "aviso aviso-error";
    }

    mostrarCarrito();
}

function pagar() {
    var carrito = obtenerCarrito();

    if (carrito.length == 0) {
        alert("Agrega productos antes de pagar.");
        return;
    }

    if (localStorage.getItem("usuarioActivo") == null) {
        alert("Debes iniciar sesion para terminar la compra.");
        window.location.href = "login.html";
        return;
    }

    alert("Compra registrada. El pago en linea se implementara en la siguiente entrega.");
    vaciarCarrito();
}

document.addEventListener("DOMContentLoaded", function () {
    actualizarContador();
});
