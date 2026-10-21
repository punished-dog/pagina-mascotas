import { Link } from "react-router-dom";

export default function NoEncontrado() {
  return (
    <section className="container py-5 text-center">
      <p className="display-1 fw-bold text-marca mb-0">404</p>
      <h1 className="h3">No encontramos esta pagina</h1>
      <p className="text-secondary">Puede que el enlace este mal escrito o que la pagina ya no exista.</p>
      <Link className="btn btn-primary" to="/">Volver al inicio</Link>
    </section>
  );
}
