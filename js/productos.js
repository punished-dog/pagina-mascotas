// arreglo con los productos de la tienda
var productos = [
    {
        id: 1,
        codigo: "AL001",
        nombre: "Alimento perro adulto 15kg",
        precio: 24990,
        descripcion: "Alimento completo para perros adultos de razas medianas y grandes. Con pollo y arroz, ayuda a mantener el pelaje sano y una buena digestion.",
        categoria: "Alimentos",
        stock: 20,
        stockCritico: 5,
        imagen: "fotos/producto1.png"
    },
    {
        id: 2,
        codigo: "AL002",
        nombre: "Alimento gato adulto 10kg",
        precio: 19990,
        descripcion: "Alimento seco para gatos adultos. Formula con pescado que ayuda al control de bolas de pelo.",
        categoria: "Alimentos",
        stock: 15,
        stockCritico: 5,
        imagen: "fotos/producto2.png"
    },
    {
        id: 3,
        codigo: "CA001",
        nombre: "Cama grande acolchada",
        precio: 29990,
        descripcion: "Cama de 90x70 cm con relleno acolchado y funda lavable. Ideal para perros medianos y grandes.",
        categoria: "Accesorios",
        stock: 8,
        stockCritico: 3,
        imagen: "fotos/producto3.png"
    },
    {
        id: 4,
        codigo: "JU001",
        nombre: "Pelota de goma resistente",
        precio: 3990,
        descripcion: "Pelota de goma natural que rebota y flota en el agua. Sirve para juegos de buscar y para masajear las encias.",
        categoria: "Juguetes",
        stock: 40,
        stockCritico: 10,
        imagen: "fotos/producto4.png"
    },
    {
        id: 5,
        codigo: "CO001",
        nombre: "Collar antipulgas",
        precio: 8990,
        descripcion: "Collar con proteccion de hasta 4 meses contra pulgas y garrapatas. Ajustable para perros y gatos.",
        categoria: "Higiene",
        stock: 12,
        stockCritico: 4,
        imagen: "fotos/producto5.png"
    },
    {
        id: 6,
        codigo: "CO002",
        nombre: "Correa retractil 5 metros",
        precio: 12990,
        descripcion: "Correa retractil con freno y boton de bloqueo. Soporta mascotas de hasta 25 kilos.",
        categoria: "Accesorios",
        stock: 10,
        stockCritico: 3,
        imagen: "fotos/producto6.png"
    },
    {
        id: 7,
        codigo: "RA001",
        nombre: "Rascador para gato",
        precio: 34990,
        descripcion: "Rascador de tres niveles con cuerda de sisal y una casita en la base. Ayuda a que el gato no rasguñe los muebles.",
        categoria: "Juguetes",
        stock: 3,
        stockCritico: 4,
        imagen: "fotos/producto7.png"
    },
    {
        id: 8,
        codigo: "SH001",
        nombre: "Shampoo para mascotas 500ml",
        precio: 5990,
        descripcion: "Shampoo hipoalergenico con avena, apto para perros y gatos desde los 3 meses.",
        categoria: "Higiene",
        stock: 25,
        stockCritico: 8,
        imagen: "fotos/producto8.png"
    }
];

// deja el precio con puntos, ejemplo 24990 queda $24.990
function formatoPrecio(valor) {
    return "$" + valor.toLocaleString("es-CL");
}

// los productos que valen 0 se muestran como gratis
function precioProducto(valor) {
    if (valor == 0) {
        return "Gratis";
    }
    return formatoPrecio(valor);
}

// busca un producto en el arreglo segun su id
function buscarProducto(id) {
    var lista = obtenerProductos();
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id == id) {
            return lista[i];
        }
    }
    return null;
}

// si el administrador modifico los productos se usan los guardados,
// si no se usa el arreglo de arriba
function obtenerProductos() {
    var guardados = localStorage.getItem("productos");
    if (guardados == null) {
        return productos;
    }
    return JSON.parse(guardados);
}

// arma las tarjetas de productos dentro del contenedor que se le indique
// categoria: si viene "todos" muestra todo, si no filtra
// limite: cuantos productos mostrar como maximo (0 = todos)
// excluir: id de un producto que no se quiere mostrar (se usa en los relacionados)
function mostrarProductos(idContenedor, categoria, limite, excluir) {
    var contenedor = document.getElementById(idContenedor);
    if (contenedor == null) {
        return;
    }

    var lista = obtenerProductos();
    var html = "";
    var contados = 0;

    for (var i = 0; i < lista.length; i++) {
        var p = lista[i];

        if (categoria != "todos" && p.categoria != categoria) {
            continue;
        }

        if (excluir != null && p.id == excluir) {
            continue;
        }

        if (limite > 0 && contados >= limite) {
            break;
        }

        html += "<article class='producto'>";
        html += "<a href='detalle-producto.html?id=" + p.id + "'><img src='" + p.imagen + "' alt='" + p.nombre + "'></a>";
        html += "<h3><a href='detalle-producto.html?id=" + p.id + "'>" + p.nombre + "</a></h3>";
        html += "<p class='precio'>" + precioProducto(p.precio) + "</p>";

        if (p.stock > 0) {
            html += "<button onclick='agregarAlCarrito(" + p.id + ", 1)'>Añadir</button>";
        } else {
            html += "<p class='agotado'>Sin stock</p>";
        }

        html += "</article>";
        contados++;
    }

    if (html == "") {
        html = "<p class='centrado'>Todavia no hay productos en esta categoria.</p>";
    }

    contenedor.innerHTML = html;
}
