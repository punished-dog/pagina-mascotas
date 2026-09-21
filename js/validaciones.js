var correosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function mostrarError(idCampo, mensaje) {
    var campo = document.getElementById(idCampo);
    var caja = document.getElementById("error-" + idCampo);

    if (caja != null) {
        caja.textContent = mensaje;
    }

    if (campo != null) {
        if (mensaje == "") {
            campo.className = "campo-bueno";
        } else {
            campo.className = "campo-malo";
        }
    }

    return mensaje == "";
}

function limpiarMarca(idCampo) {
    var campo = document.getElementById(idCampo);
    if (campo != null) {
        campo.className = "";
    }
    var caja = document.getElementById("error-" + idCampo);
    if (caja != null) {
        caja.textContent = "";
    }
}

function correoValido(correo) {
    if (correo.indexOf("@") == -1) {
        return false;
    }
    for (var i = 0; i < correosPermitidos.length; i++) {
        if (correo.toLowerCase().endsWith(correosPermitidos[i])) {
            return true;
        }
    }
    return false;
}

function validarCorreo(idCampo) {
    var valor = document.getElementById(idCampo).value.trim();

    if (valor == "") {
        return mostrarError(idCampo, "Escribe tu correo.");
    }
    if (valor.length > 100) {
        return mostrarError(idCampo, "El correo no puede tener mas de 100 caracteres.");
    }
    if (correoValido(valor) == false) {
        return mostrarError(idCampo, "Solo aceptamos correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    }
    return mostrarError(idCampo, "");
}

function validarPassword(idCampo) {
    var valor = document.getElementById(idCampo).value;

    if (valor == "") {
        return mostrarError(idCampo, "Escribe tu contraseña.");
    }
    if (valor.length < 4 || valor.length > 10) {
        return mostrarError(idCampo, "La contraseña debe tener entre 4 y 10 caracteres.");
    }
    return mostrarError(idCampo, "");
}

function validarTexto(idCampo, maximo, obligatorio, nombreCampo) {
    var valor = document.getElementById(idCampo).value.trim();

    if (obligatorio == true && valor == "") {
        return mostrarError(idCampo, "El campo " + nombreCampo + " es obligatorio.");
    }
    if (valor.length > maximo) {
        return mostrarError(idCampo, nombreCampo + " no puede superar los " + maximo + " caracteres.");
    }
    return mostrarError(idCampo, "");
}

function calcularDv(numero) {
    var suma = 0;
    var multiplo = 2;

    for (var i = numero.length - 1; i >= 0; i--) {
        suma = suma + parseInt(numero.charAt(i)) * multiplo;
        multiplo++;
        if (multiplo > 7) {
            multiplo = 2;
        }
    }

    var resto = 11 - (suma % 11);

    if (resto == 11) {
        return "0";
    }
    if (resto == 10) {
        return "K";
    }
    return "" + resto;
}

function validarRun(idCampo) {
    var valor = document.getElementById(idCampo).value.trim().toUpperCase();

    if (valor == "") {
        return mostrarError(idCampo, "El run es obligatorio.");
    }
    if (valor.indexOf(".") != -1 || valor.indexOf("-") != -1) {
        return mostrarError(idCampo, "Escribe el run sin puntos ni guion, por ejemplo 19000015K.");
    }
    if (valor.length < 7 || valor.length > 9) {
        return mostrarError(idCampo, "El run debe tener entre 7 y 9 caracteres.");
    }

    var cuerpo = valor.substring(0, valor.length - 1);
    var dv = valor.charAt(valor.length - 1);

    if (isNaN(cuerpo)) {
        return mostrarError(idCampo, "El run solo puede tener numeros y la K al final.");
    }
    if (calcularDv(cuerpo) != dv) {
        return mostrarError(idCampo, "El run no es valido, revisa el digito verificador.");
    }

    return mostrarError(idCampo, "");
}

function validarSelect(idCampo, nombreCampo) {
    var valor = document.getElementById(idCampo).value;

    if (valor == "") {
        return mostrarError(idCampo, "Tienes que elegir una opcion en " + nombreCampo + ".");
    }
    return mostrarError(idCampo, "");
}

function validarNumero(idCampo, minimo, entero, obligatorio, nombreCampo) {
    var valor = document.getElementById(idCampo).value.trim();

    if (valor == "") {
        if (obligatorio == true) {
            return mostrarError(idCampo, "El campo " + nombreCampo + " es obligatorio.");
        }
        return mostrarError(idCampo, "");
    }

    if (isNaN(valor)) {
        return mostrarError(idCampo, nombreCampo + " tiene que ser un numero.");
    }

    var numero = Number(valor);

    if (numero < minimo) {
        return mostrarError(idCampo, nombreCampo + " no puede ser menor que " + minimo + ".");
    }

    if (entero == true && numero % 1 != 0) {
        return mostrarError(idCampo, nombreCampo + " tiene que ser un numero entero.");
    }

    return mostrarError(idCampo, "");
}

function validarLogin() {
    var ok = true;

    if (validarCorreo("correo") == false) {
        ok = false;
    }
    if (validarPassword("password") == false) {
        ok = false;
    }

    if (ok == false) {
        return false;
    }

    var correo = document.getElementById("correo").value.trim().toLowerCase();
    var password = document.getElementById("password").value;
    var lista = obtenerUsuarios();
    var mensaje = document.getElementById("mensajeLogin");

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].correo.toLowerCase() == correo && lista[i].password == password) {
            localStorage.setItem("usuarioActivo", JSON.stringify(lista[i]));

            if (lista[i].tipo == "Cliente") {
                window.location.href = "pets.html";
            } else {
                window.location.href = "admin/home.html";
            }
            return false;
        }
    }

    mensaje.textContent = "El correo o la contraseña no coinciden con ninguna cuenta.";
    mensaje.className = "aviso aviso-error";
    return false;
}

function validarContacto() {
    var ok = true;

    if (validarTexto("nombre", 100, true, "nombre") == false) {
        ok = false;
    }
    if (validarCorreo("correo") == false) {
        ok = false;
    }
    if (validarTexto("comentario", 500, true, "comentario") == false) {
        ok = false;
    }

    var mensaje = document.getElementById("mensajeContacto");

    if (ok == false) {
        mensaje.textContent = "Revisa los campos marcados en rojo antes de enviar.";
        mensaje.className = "aviso aviso-error";
        return false;
    }

    mensaje.textContent = "Gracias por escribirnos, te responderemos dentro de 48 horas.";
    mensaje.className = "aviso";
    document.getElementById("formContacto").reset();
    limpiarMarca("nombre");
    limpiarMarca("correo");
    limpiarMarca("comentario");
    return false;
}

function validarUsuario(esRegistro) {
    var ok = true;

    if (validarRun("run") == false) {
        ok = false;
    }
    if (validarTexto("nombre", 50, true, "nombre") == false) {
        ok = false;
    }
    if (validarTexto("apellidos", 100, true, "apellidos") == false) {
        ok = false;
    }
    if (validarCorreo("correo") == false) {
        ok = false;
    }
    if (validarSelect("region", "region") == false) {
        ok = false;
    }
    if (validarSelect("comuna", "comuna") == false) {
        ok = false;
    }
    if (validarTexto("direccion", 300, true, "direccion") == false) {
        ok = false;
    }

    if (document.getElementById("tipo") != null) {
        if (validarSelect("tipo", "tipo de usuario") == false) {
            ok = false;
        }
    }

    if (document.getElementById("password") != null) {
        if (validarPassword("password") == false) {
            ok = false;
        }
        if (document.getElementById("password2") != null) {
            if (document.getElementById("password").value != document.getElementById("password2").value) {
                mostrarError("password2", "Las contraseñas no son iguales.");
                ok = false;
            } else {
                mostrarError("password2", "");
            }
        }
    }

    if (ok == false) {
        var aviso = document.getElementById("mensajeUsuario");
        if (aviso != null) {
            aviso.textContent = "Revisa los campos marcados en rojo antes de guardar.";
            aviso.className = "aviso aviso-error";
        }
        return false;
    }

    return guardarUsuarioFormulario(esRegistro);
}

function guardarUsuarioFormulario(esRegistro) {
    var lista = obtenerUsuarios();
    var correo = document.getElementById("correo").value.trim();
    var run = document.getElementById("run").value.trim().toUpperCase();
    var editando = document.getElementById("runOriginal");
    var mensaje = document.getElementById("mensajeUsuario");

    for (var i = 0; i < lista.length; i++) {
        var mismoUsuario = editando != null && lista[i].run == editando.value;
        if (lista[i].correo.toLowerCase() == correo.toLowerCase() && mismoUsuario == false) {
            mensaje.textContent = "Ya existe una cuenta registrada con ese correo.";
            mensaje.className = "aviso aviso-error";
            return false;
        }
    }

    var usuario = {
        run: run,
        nombre: document.getElementById("nombre").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
        correo: correo,
        password: document.getElementById("password") != null ? document.getElementById("password").value : "",
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        tipo: document.getElementById("tipo") != null ? document.getElementById("tipo").value : "Cliente",
        region: document.getElementById("region").value,
        comuna: document.getElementById("comuna").value,
        direccion: document.getElementById("direccion").value.trim()
    };

    if (editando != null && editando.value != "") {
        for (var j = 0; j < lista.length; j++) {
            if (lista[j].run == editando.value) {
                if (usuario.password == "") {
                    usuario.password = lista[j].password;
                }
                lista[j] = usuario;
            }
        }
        guardarUsuarios(lista);
        window.location.href = "usuarios.html";
        return false;
    }

    for (var k = 0; k < lista.length; k++) {
        if (lista[k].run == run) {
            mensaje.textContent = "Ese run ya esta registrado.";
            mensaje.className = "aviso aviso-error";
            return false;
        }
    }

    lista.push(usuario);
    guardarUsuarios(lista);

    if (esRegistro == true) {
        mensaje.textContent = "Cuenta creada. Ya puedes iniciar sesion.";
        mensaje.className = "aviso";
        document.getElementById("formUsuario").reset();
    } else {
        window.location.href = "usuarios.html";
    }

    return false;
}

function validarProducto() {
    var ok = true;

    if (validarTexto("codigo", 20, true, "codigo") == false) {
        ok = false;
    } else if (document.getElementById("codigo").value.trim().length < 3) {
        mostrarError("codigo", "El codigo debe tener al menos 3 caracteres.");
        ok = false;
    }

    if (validarTexto("nombre", 100, true, "nombre") == false) {
        ok = false;
    }
    if (validarTexto("descripcion", 500, false, "descripcion") == false) {
        ok = false;
    }
    if (validarNumero("precio", 0, false, true, "precio") == false) {
        ok = false;
    }
    if (validarNumero("stock", 0, true, true, "stock") == false) {
        ok = false;
    }
    if (validarNumero("stockCritico", 0, true, false, "stock critico") == false) {
        ok = false;
    }
    if (validarSelect("categoria", "categoria") == false) {
        ok = false;
    }

    if (ok == false) {
        return false;
    }

    return guardarProductoFormulario();
}

function activarValidacionEnVivo(campos) {
    for (var i = 0; i < campos.length; i++) {
        (function (campo) {
            var elemento = document.getElementById(campo.id);
            if (elemento == null) {
                return;
            }
            elemento.addEventListener("blur", campo.funcion);
            elemento.addEventListener("input", campo.funcion);
        })(campos[i]);
    }
}
