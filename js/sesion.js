// usuarios de prueba del sistema
// los roles son: administrador, vendedor y cliente
var usuariosIniciales = [
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

function obtenerUsuarios() {
    var datos = localStorage.getItem("usuarios");
    if (datos == null) {
        localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
        return usuariosIniciales;
    }
    return JSON.parse(datos);
}

function guardarUsuarios(lista) {
    localStorage.setItem("usuarios", JSON.stringify(lista));
}

function usuarioActivo() {
    var datos = localStorage.getItem("usuarioActivo");
    if (datos == null) {
        return null;
    }
    return JSON.parse(datos);
}

function cerrarSesion(ruta) {
    localStorage.removeItem("usuarioActivo");
    window.location.href = ruta;
}

// escribe arriba a la derecha si hay alguien conectado
function mostrarSesion() {
    var caja = document.getElementById("barraSesion");
    if (caja == null) {
        return;
    }

    var usuario = usuarioActivo();

    if (usuario == null) {
        caja.innerHTML = "<a href='login.html'>Iniciar sesion</a> | <a href='registro.html'>Registrar usuario</a>";
        return;
    }

    var html = "Hola " + usuario.nombre + " (" + usuario.tipo + ") ";

    if (usuario.tipo == "Administrador" || usuario.tipo == "Vendedor") {
        html += "| <a href='admin/home.html'>Administrador</a> ";
    }

    html += "| <a href='#' onclick='cerrarSesion(\"pets.html\")'>Cerrar sesion</a>";
    caja.innerHTML = html;
}

// las paginas del administrador llaman a esta funcion,
// si no hay sesion o es un cliente lo devuelve a la tienda
function protegerAdmin() {
    var usuario = usuarioActivo();

    if (usuario == null) {
        alert("Debes iniciar sesion para entrar al administrador.");
        window.location.href = "../login.html";
        return;
    }

    if (usuario.tipo == "Cliente") {
        alert("Tu perfil no tiene permisos para entrar al administrador.");
        window.location.href = "../pets.html";
        return;
    }

    var saludo = document.getElementById("saludoAdmin");
    if (saludo != null) {
        saludo.textContent = "Hola " + usuario.nombre + ", perfil " + usuario.tipo;
    }

    // el vendedor solo puede ver productos, asi que le escondemos los usuarios
    if (usuario.tipo == "Vendedor") {
        var opciones = document.getElementsByClassName("solo-admin");
        for (var i = 0; i < opciones.length; i++) {
            opciones[i].style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarSesion();
});
