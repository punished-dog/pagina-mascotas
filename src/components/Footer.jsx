import { Link } from "react-router-dom";
import { listarCategorias } from "../data/categorias";

export default function Footer() {
  const categorias = listarCategorias();

  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <img src="/fotos/logo.png" alt="logo de GuauMiau" width="36" height="36" />
              <span className="fw-bold fs-5">GuauMiau</span>
            </div>
            <p className="small text-secondary mb-1">Av. Don Ramon 1234, Santiago</p>
            <p className="small text-secondary mb-1">+56 2 2345 6789</p>
            <p className="small text-secondary mb-0">Lunes a sabado de 10:00 a 20:00</p>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="text-uppercase small fw-bold">Tienda</h6>
            <ul className="list-unstyled small">
              <li><Link className="link-light link-underline-opacity-0" to="/productos">Productos</Link></li>
              <li><Link className="link-light link-underline-opacity-0" to="/ofertas">Ofertas</Link></li>
              <li><Link className="link-light link-underline-opacity-0" to="/servicios">Servicios</Link></li>
              <li><Link className="link-light link-underline-opacity-0" to="/nosotros">Nosotros</Link></li>
              <li><Link className="link-light link-underline-opacity-0" to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="text-uppercase small fw-bold">Categorias</h6>
            <ul className="list-unstyled small">
              {categorias.map((categoria) => (
                <li key={categoria.id}>
                  <Link className="link-light link-underline-opacity-0" to={"/categorias/" + categoria.nombre}>
                    {categoria.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h6 className="text-uppercase small fw-bold">Medios de pago</h6>
            <div className="d-flex gap-3 fs-4 text-secondary">
              <i className="bi bi-credit-card" title="Tarjeta de credito"></i>
              <i className="bi bi-credit-card-2-front" title="Tarjeta de debito"></i>
              <i className="bi bi-bank" title="Transferencia"></i>
            </div>
            <p className="small text-secondary mt-2 mb-0">Despacho gratis en compras desde $30.000.</p>
          </div>
        </div>

        <hr className="border-secondary" />
        <p className="small text-secondary text-center mb-0">2026 todos los derechos reservados a guaumiau.cl</p>
      </div>
    </footer>
  );
}
