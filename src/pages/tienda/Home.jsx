import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListaProductos from "../../components/ListaProductos";
import { listarProductos, productosEnOferta } from "../../data/productos";
import { listarCategorias } from "../../data/categorias";
import { useAgregarAlCarrito } from "../../hooks/useAgregarAlCarrito";

const diapositivas = [
  {
    titulo: "Todo lo que tu mascota necesita",
    texto: "Alimento, juguetes, camas y accesorios para perros y gatos, con despacho gratis desde $30.000.",
    imagen: "/fotos/mascotas.png",
    boton: "Ver productos",
    enlace: "/productos"
  },
  {
    titulo: "Ofertas de la semana",
    texto: "Hasta 25% de descuento en productos seleccionados. Usa el cupon GUAUMIAU10 y llevate un 10% extra.",
    imagen: "/fotos/mascotas-nosotros.png",
    boton: "Ver ofertas",
    enlace: "/ofertas"
  },
  {
    titulo: "Nuevo rascador de tres niveles",
    texto: "Con cuerda de sisal y una casita en la base, para que tu gato deje tranquilos los muebles.",
    imagen: "/fotos/producto7.png",
    boton: "Ver producto",
    enlace: "/producto/7"
  }
];

export default function Home() {
  const [actual, setActual] = useState(0);
  const { agregarProducto, elementoAviso } = useAgregarAlCarrito();
  const destacados = listarProductos().slice(0, 4);
  const ofertas = productosEnOferta().slice(0, 4);
  const categorias = listarCategorias();

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((anterior) => (anterior + 1) % diapositivas.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, []);

  function mover(paso) {
    setActual((actual + paso + diapositivas.length) % diapositivas.length);
  }

  return (
    <>
      <h1 className="visually-hidden">GuauMiau, tienda de mascotas</h1>

      <section className="bg-marca-suave">
        <div className="container">
          <div className="carousel carousel-dark slide position-relative">
            <div className="carousel-inner">
              {diapositivas.map((diapositiva, indice) => (
                <div key={diapositiva.titulo} className={"carousel-item" + (indice === actual ? " active" : "")}>
                  <div className="row align-items-center g-4 py-4 py-lg-5 px-4 px-lg-5">
                    <div className="col-12 col-md-6 text-center text-md-start">
                      <h2 className="display-6 fw-bold">{diapositiva.titulo}</h2>
                      <p className="lead text-secondary">{diapositiva.texto}</p>
                      <Link className="btn btn-primary btn-lg" to={diapositiva.enlace}>{diapositiva.boton}</Link>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                      <img className="img-fluid imagen-carrusel" src={diapositiva.imagen} alt={diapositiva.titulo} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-control-prev" type="button" onClick={() => mover(-1)}>
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" onClick={() => mover(1)}>
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>

            <div className="carousel-indicators position-static m-0 pb-3">
              {diapositivas.map((diapositiva, indice) => (
                <button
                  key={diapositiva.titulo}
                  type="button"
                  data-indicador
                  className={indice === actual ? "active" : ""}
                  aria-label={"Ir a la diapositiva " + (indice + 1)}
                  aria-current={indice === actual}
                  onClick={() => setActual(indice)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="h3 text-center mb-4">Categorias</h2>
        <div className="row g-3">
          {categorias.map((categoria) => (
            <div className="col-6 col-lg-3" key={categoria.id}>
              <Link className="card h-100 text-decoration-none shadow-sm tarjeta-categoria" to={"/categorias/" + categoria.nombre}>
                <img className="card-img-top p-3 bg-white" src={categoria.imagen} alt={categoria.nombre} />
                <div className="card-body text-center">
                  <h3 className="h6 mb-0">{categoria.nombre}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-end mb-3">
          <h2 className="h3 mb-0">Lo mas vendido</h2>
          <Link to="/productos">Ver todo el catalogo</Link>
        </div>
        <ListaProductos productos={destacados} onAgregar={(p) => agregarProducto(p)} />
      </section>

      <section className="bg-white border-top border-bottom py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <h2 className="h3 mb-0">Ofertas</h2>
            <Link to="/ofertas">Ver todas las ofertas</Link>
          </div>
          <ListaProductos productos={ofertas} onAgregar={(p) => agregarProducto(p)} />
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <article className="col-12 col-md-4">
            <h2 className="h5"><i className="bi bi-shop text-marca me-2"></i>Historia</h2>
            <p className="text-secondary mb-0">La tienda se creo el año 2010 en Santiago. Sus fundadores son amantes de los animales y partieron vendiendo alimento a los vecinos del barrio.</p>
          </article>
          <article className="col-12 col-md-4">
            <h2 className="h5"><i className="bi bi-geo-alt text-marca me-2"></i>Ubicacion</h2>
            <p className="text-secondary mb-0">Tenemos un solo local, en Av. Don Ramon 1234, Santiago. Atendemos de lunes a sabado de 10:00 a 20:00.</p>
          </article>
          <article className="col-12 col-md-4">
            <h2 className="h5"><i className="bi bi-truck text-marca me-2"></i>Despacho</h2>
            <p className="text-secondary mb-0">Enviamos a todo Chile. En Santiago la entrega demora entre 1 y 3 dias habiles, y es gratis en compras desde $30.000.</p>
          </article>
        </div>
      </section>

      {elementoAviso}
    </>
  );
}
