import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-12 col-lg-6">
          <h1 className="display-5 fw-bold">Tienda de mascotas</h1>
          <p className="lead text-secondary">
            Somos una tienda de barrio en Santiago con todo lo que tu perro o gato necesita.
          </p>
          <Link className="btn btn-primary btn-lg" to="/productos">Ver productos</Link>
        </div>
        <div className="col-12 col-lg-6">
          <img className="img-fluid rounded-4" src="/fotos/mascotas.png" alt="perros y gatos de la tienda" />
        </div>
      </div>
    </section>
  );
}
