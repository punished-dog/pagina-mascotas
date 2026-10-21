import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Contador from "../../components/Contador";
import { useCarrito } from "../../context/CarritoContext";
import { useSesion } from "../../context/SesionContext";
import { formatoPrecio } from "../../utils/formato";
import { MONTO_DESPACHO_GRATIS } from "../../utils/carrito";

export default function Carrito() {
  const { lineas, resumen, cupon, cambiar, quitar, vaciar, aplicarCupon } = useCarrito();
  const { usuario } = useSesion();
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState(cupon);
  const [mensajeCupon, setMensajeCupon] = useState(null);

  function enviarCupon(e) {
    e.preventDefault();
    if (codigo.trim() === "") {
      aplicarCupon("");
      setMensajeCupon(null);
      return;
    }
    if (aplicarCupon(codigo)) {
      setMensajeCupon({ tipo: "success", texto: "Cupon aplicado correctamente." });
    } else {
      setMensajeCupon({ tipo: "danger", texto: "El cupon no existe o ya no esta vigente." });
    }
  }

  function irAPagar() {
    if (usuario === null) {
      navigate("/login?volver=/checkout");
    } else {
      navigate("/checkout");
    }
  }

  if (lineas.length === 0) {
    return (
      <section className="container py-5 text-center">
        <i className="bi bi-cart-x display-4 text-secondary"></i>
        <h1 className="h3 mt-3">Tu carrito esta vacio</h1>
        <p className="text-secondary">Agrega productos desde el catalogo para poder comprarlos.</p>
        <Link className="btn btn-primary" to="/productos">Ir a los productos</Link>
      </section>
    );
  }

  const faltaParaGratis = MONTO_DESPACHO_GRATIS - resumen.subtotal;

  return (
    <section className="container py-4">
      <h1 className="h2 mb-4">Carrito de compras</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <ul className="list-group list-group-flush">
              {lineas.map((linea) => (
                <li className="list-group-item py-3" key={linea.id}>
                  <div className="row align-items-center g-3">
                    <div className="col-3 col-md-2">
                      <img className="img-fluid" src={linea.imagen} alt={linea.nombre} />
                    </div>
                    <div className="col-9 col-md-4">
                      <Link className="link-dark fw-semibold" to={"/producto/" + linea.id}>{linea.nombre}</Link>
                      <div className="small text-secondary">{formatoPrecio(linea.precio)} c/u</div>
                    </div>
                    <div className="col-6 col-md-3">
                      <Contador
                        valor={linea.cantidad}
                        minimo={1}
                        maximo={linea.stock}
                        onCambiar={(nueva) => cambiar(linea.id, nueva)}
                      />
                    </div>
                    <div className="col-4 col-md-2 text-end fw-bold">{formatoPrecio(linea.subtotal)}</div>
                    <div className="col-2 col-md-1 text-end">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        type="button"
                        aria-label={"Quitar " + linea.nombre}
                        onClick={() => quitar(linea.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <Link className="btn btn-link px-0" to="/productos">
              <i className="bi bi-arrow-left me-1"></i>Seguir comprando
            </Link>
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={vaciar}>
              Vaciar carrito
            </button>
          </div>
        </div>

        <aside className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5">Resumen</h2>

              <form className="mb-3" onSubmit={enviarCupon}>
                <label className="form-label small" htmlFor="cupon">Cupon de descuento</label>
                <div className="input-group">
                  <input
                    id="cupon"
                    className="form-control"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Ej: GUAUMIAU10"
                  />
                  <button className="btn btn-outline-primary" type="submit">Aplicar</button>
                </div>
                {mensajeCupon !== null && (
                  <div className={"small mt-1 text-" + mensajeCupon.tipo}>{mensajeCupon.texto}</div>
                )}
              </form>

              <dl className="row mb-0">
                <dt className="col-7 fw-normal">Subtotal</dt>
                <dd className="col-5 text-end">{formatoPrecio(resumen.subtotal)}</dd>
                {resumen.descuento > 0 && (
                  <>
                    <dt className="col-7 fw-normal">Descuento ({cupon})</dt>
                    <dd className="col-5 text-end text-success">-{formatoPrecio(resumen.descuento)}</dd>
                  </>
                )}
                <dt className="col-7 fw-normal">Despacho</dt>
                <dd className="col-5 text-end">{resumen.despacho === 0 ? "Gratis" : formatoPrecio(resumen.despacho)}</dd>
                <dt className="col-7 fs-5">Total</dt>
                <dd className="col-5 text-end fs-5 fw-bold">{formatoPrecio(resumen.total)}</dd>
              </dl>

              {faltaParaGratis > 0 && (
                <p className="small text-secondary mb-3">
                  Te faltan {formatoPrecio(faltaParaGratis)} para tener despacho gratis.
                </p>
              )}

              <button className="btn btn-primary w-100" type="button" onClick={irAPagar}>
                Ir a pagar
              </button>
              {usuario === null && (
                <p className="small text-secondary text-center mt-2 mb-0">Necesitas iniciar sesion para pagar.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
