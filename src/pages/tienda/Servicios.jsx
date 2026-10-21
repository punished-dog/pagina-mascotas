import { Link } from "react-router-dom";
import ListaProductos from "../../components/ListaProductos";
import { productosPorCategoria } from "../../data/productos";
import { useAgregarAlCarrito } from "../../hooks/useAgregarAlCarrito";

const servicios = [
  { nombre: "Peluqueria", icono: "bi-scissors", texto: "Corte de pelo y uñas segun la raza." },
  { nombre: "Baño", icono: "bi-droplet", texto: "Baño con shampoo especial y secado incluido." },
  { nombre: "Vacunas", icono: "bi-heart-pulse", texto: "Vacunas al dia con veterinario del local." }
];

export default function Servicios() {
  const { agregarProducto, elementoAviso } = useAgregarAlCarrito();

  return (
    <section className="container py-4">
      <h1 className="h2 mb-4">Servicios</h1>

      <div className="row g-4 mb-4">
        {servicios.map((s) => (
          <div className="col-12 col-md-4" key={s.nombre}>
            <article className="card h-100 shadow-sm text-center">
              <div className="card-body">
                <i className={"bi " + s.icono + " display-6 text-marca"}></i>
                <h2 className="h5 mt-2">{s.nombre}</h2>
                <p className="text-secondary mb-0">{s.texto}</p>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6">
          <article className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Productos que vendemos</h2>
              <ul className="mb-0">
                <li>Comida para perros y gatos</li>
                <li>Juguetes</li>
                <li>Camas</li>
                <li>Collares y correas</li>
              </ul>
            </div>
          </article>
        </div>
        <div className="col-12 col-md-6">
          <article className="card h-100 shadow-sm bg-marca-suave border-0">
            <div className="card-body">
              <h2 className="h5">Como reservar</h2>
              <p>Todos los servicios se atienden con hora reservada. Puedes pedir tu hora por telefono al +56 2 2345 6789 o dejarnos un mensaje en la pagina de contacto.</p>
              <Link className="btn btn-primary" to="/contacto">Reservar una hora</Link>
            </div>
          </article>
        </div>
      </div>

      <h2 className="h4 mb-3">Productos relacionados a los servicios</h2>
      <ListaProductos productos={productosPorCategoria("Higiene")} onAgregar={(p) => agregarProducto(p)} />

      {elementoAviso}
    </section>
  );
}
