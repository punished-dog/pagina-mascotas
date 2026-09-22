function guardarProductos(lista) {
    localStorage.setItem("productos", JSON.stringify(lista));
}

function mostrarResumenAdmin() {
    var listaProductos = obtenerProductos();
    var listaUsuarios = obtenerUsuarios();
    var sinStock = 0;
    var criticos = [];

    for (var i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i].stock == 0) {
            sinStock++;
        }
        if (listaProductos[i].stockCritico != "" && listaProductos[i].stock <= listaProductos[i].stockCritico) {
            criticos.push(listaProductos[i].nombre + " (quedan " + listaProductos[i].stock + ")");
        }
    }

    document.getElementById("totalProductos").textContent = listaProductos.length;
    document.getElementById("totalUsuarios").textContent = listaUsuarios.length;
    document.getElementById("totalSinStock").textContent = sinStock;

    var aviso = document.getElementById("avisoStock");
    if (criticos.length > 0) {
        aviso.innerHTML = "<strong>Productos en stock critico:</strong> " + criticos.join(", ");
    } else {
        aviso.style.display = "none";
    }
}

function mostrarTablaProductos() {
    var cuerpo = document.getElementById("tablaProductos");
    if (cuerpo == null) {
        return;
    }

    var lista = obtenerProductos();
    var html = "";

    for (var i = 0; i < lista.length; i++) {
        var p = lista[i];
        var estado = "Disponible";

        if (p.stock == 0) {
            estado = "Sin stock";
        } else if (p.stockCritico != "" && p.stock <= p.stockCritico) {
            estado = "Stock critico";
        }

        html += "<tr>";
        html += "<td>" + p.codigo + "</td>";
        html += "<td>" + p.nombre + "</td>";
        html += "<td>" + p.categoria + "</td>";
        html += "<td>" + precioProducto(p.precio) + "</td>";
        html += "<td>" + p.stock + "</td>";
        html += "<td>" + estado + "</td>";
        html += "<td class='acciones'>";
        html += "<a href='producto-ver.html?id=" + p.id + "'>Ver</a>";
        html += "<a class='solo-admin' href='producto-editar.html?id=" + p.id + "'>Editar</a>";
        html += "<a class='solo-admin' href='#' onclick='eliminarProducto(" + p.id + ")'>Eliminar</a>";
        html += "</td>";
        html += "</tr>";
    }

    cuerpo.innerHTML = html;

    protegerAdmin();
}

function eliminarProducto(id) {
    if (confirm("Seguro que quieres eliminar este producto?") == false) {
        return;
    }

    var lista = obtenerProductos();
    var nueva = [];

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id != id) {
            nueva.push(lista[i]);
        }
    }

    guardarProductos(nueva);
    mostrarTablaProductos();
}

function cargarProducto() {
    var id = new URLSearchParams(window.location.search).get("id");
    var producto = buscarProducto(id);

    if (producto == null) {
        alert("No se encontro el producto.");
        window.location.href = "productos.html";
        return;
    }

    document.getElementById("idOriginal").value = producto.id;
    document.getElementById("codigo").value = producto.codigo;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("stockCritico").value = producto.stockCritico;
    document.getElementById("categoria").value = producto.categoria;
}

function verProducto() {
    var id = new URLSearchParams(window.location.search).get("id");
    var p = buscarProducto(id);

    if (p == null) {
        alert("No se encontro el producto.");
        window.location.href = "productos.html";
        return;
    }

    var html = "<tr><th>Codigo</th><td>" + p.codigo + "</td></tr>";
    html += "<tr><th>Nombre</th><td>" + p.nombre + "</td></tr>";
    html += "<tr><th>Descripcion</th><td>" + p.descripcion + "</td></tr>";
    html += "<tr><th>Categoria</th><td>" + p.categoria + "</td></tr>";
    html += "<tr><th>Precio</th><td>" + precioProducto(p.precio) + "</td></tr>";
    html += "<tr><th>Stock</th><td>" + p.stock + "</td></tr>";
    html += "<tr><th>Stock critico</th><td>" + p.stockCritico + "</td></tr>";

    document.getElementById("detalleProducto").innerHTML = html;
    document.getElementById("editarProducto").href = "producto-editar.html?id=" + p.id;
}

function guardarProductoFormulario() {
    var lista = obtenerProductos();
    var campoId = document.getElementById("idOriginal");
    var stockCritico = document.getElementById("stockCritico").value.trim();

    var producto = {
        id: 0,
        codigo: document.getElementById("codigo").value.trim(),
        nombre: document.getElementById("nombre").value.trim(),
        precio: Number(document.getElementById("precio").value),
        descripcion: document.getElementById("descripcion").value.trim(),
        categoria: document.getElementById("categoria").value,
        stock: Number(document.getElementById("stock").value),
        stockCritico: stockCritico == "" ? "" : Number(stockCritico),
        imagen: "fotos/producto1.png"
    };

    if (campoId != null && campoId.value != "") {
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].id == campoId.value) {
                producto.id = lista[i].id;
                producto.imagen = lista[i].imagen;
                lista[i] = producto;
            }
        }
    } else {
        var mayor = 0;
        for (var j = 0; j < lista.length; j++) {
            if (lista[j].id > mayor) {
                mayor = lista[j].id;
            }
        }
        producto.id = mayor + 1;
        lista.push(producto);
    }

    guardarProductos(lista);
    window.location.href = "productos.html";
    return false;
}

function mostrarTablaUsuarios() {
    var cuerpo = document.getElementById("tablaUsuarios");
    if (cuerpo == null) {
        return;
    }

    var lista = obtenerUsuarios();
    var html = "";

    for (var i = 0; i < lista.length; i++) {
        var u = lista[i];
        html += "<tr>";
        html += "<td>" + u.run + "</td>";
        html += "<td>" + u.nombre + " " + u.apellidos + "</td>";
        html += "<td>" + u.correo + "</td>";
        html += "<td>" + u.tipo + "</td>";
        html += "<td>" + u.comuna + "</td>";
        html += "<td class='acciones'>";
        html += "<a href='usuario-editar.html?run=" + u.run + "'>Editar</a>";
        html += "<a href='#' onclick='eliminarUsuario(\"" + u.run + "\")'>Eliminar</a>";
        html += "</td>";
        html += "</tr>";
    }

    cuerpo.innerHTML = html;
}

function eliminarUsuario(run) {
    if (confirm("Seguro que quieres eliminar este usuario?") == false) {
        return;
    }

    var activo = usuarioActivo();
    if (activo != null && activo.run == run) {
        alert("No puedes eliminar la cuenta con la que estas conectado.");
        return;
    }

    var lista = obtenerUsuarios();
    var nueva = [];

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].run != run) {
            nueva.push(lista[i]);
        }
    }

    guardarUsuarios(nueva);
    mostrarTablaUsuarios();
}

function cargarUsuario() {
    var run = new URLSearchParams(window.location.search).get("run");
    var lista = obtenerUsuarios();

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].run == run) {
            var u = lista[i];

            document.getElementById("runOriginal").value = u.run;
            document.getElementById("run").value = u.run;
            document.getElementById("nombre").value = u.nombre;
            document.getElementById("apellidos").value = u.apellidos;
            document.getElementById("correo").value = u.correo;
            document.getElementById("fechaNacimiento").value = u.fechaNacimiento;
            document.getElementById("tipo").value = u.tipo;
            document.getElementById("region").value = u.region;

            cargarComunas(u.region, document.getElementById("comuna"));
            document.getElementById("comuna").value = u.comuna;
            document.getElementById("direccion").value = u.direccion;
            return;
        }
    }

    alert("No se encontro el usuario.");
    window.location.href = "usuarios.html";
}
