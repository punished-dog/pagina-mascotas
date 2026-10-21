import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CampoTexto from "../../components/CampoTexto";
import SelectorRegion from "../../components/SelectorRegion";
import { useCarrito } from "../../context/CarritoContext";
import { useSesion } from "../../context/SesionContext";
import { crearOrden } from "../../data/ordenes";
import { descontarStock } from "../../data/productos";
import { formatoPrecio } from "../../utils/formato";
import { validarDatosCompra, sinErrores } from "../../utils/validaciones";

function datosDesdeUsuario(usuario) {
  return {
    nombre: usuario ? usuario.nombre : "",
    apellidos: usuario ? usuario.apellidos : "",
    correo: usuario ? usuario.correo : "",
    calle: usuario && usuario.direccion ? usuario.direccion : "",
    departamento: "",
    region: usuario && usuario.region ? usuario.region : "",
    comuna: usuario && usuario.comuna ? usuario.comuna : "",
    indicaciones: ""
  };
}

export default function Checkout() {
  const { lineas, resumen, cupon, vaciar } = useCarrito();
  const { usuario } = useSesion();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(() => datosDesdeUsuario(usuario));
  const [errores, setErrores] = useState({});
  const [simularRechazo, setSimularRechazo] = useState(false);

  if (usuario === null) {
    return <Navigate to="/login?volver=/checkout" replace />;
  }

  if (lineas.length === 0) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3">No tienes productos para pagar</h1>
        <Link className="btn btn-primary mt-2" to="/productos">Ver productos</Link>
      </section>
    );
  }

  function cambiarCampo(campo, valor) {
    setDatos((anteriores) => ({ ...anteriores, [campo]: valor }));
    setErrores((anteriores) => ({ ...anteriores, [campo]: "" }));
  }

  function pagar(e) {
    e.preventDefault();
    const nuevosErrores = validarDatosCompra(datos);
    setErrores(nuevosErrores);
    if (!sinErrores(nuevosErrores)) {
      return;
    }

    const items = lineas.map((l) => ({
      id: l.id,
      nombre: l.nombre,
      precio: l.precio,
      cantidad: l.cantidad,
      imagen: l.imagen
    }));

    const orden = crearOrden({
      estado: simularRechazo ? "Rechazada" : "Pagada",
      cliente: { nombre: datos.nombre.trim(), apellidos: datos.apellidos.trim(), correo: datos.correo.trim() },
      direccion: {
        calle: datos.calle.trim(),
        departamento: datos.departamento.trim(),
        region: datos.region,
        comuna: datos.comuna,
        indicaciones: datos.indicaciones.trim()
      },
      items,
      cupon,
      ...resumen
    });

    if (orden.estado === "Pagada") {
      descontarStock(items);
      vaciar();
      navigate("/compra/exito/" + orden.id);
    } else {
      navigate("/compra/error/" + orden.id);
    }
  }

  return (
    <section className="container py-4">
      <h1 className="h2 mb-4">Finalizar compra</h1>

      <form className="row g-4" onSubmit={pagar} noValidate>
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h5 mb-3">Datos del cliente</h2>
              <div className="row">
                <div className="col-12 col-md-6">
                  <CampoTexto id="nombre" etiqueta="Nombre" obligatorio valor={datos.nombre} onCambiar={cambiarCampo} error={errores.nombre || ""} />
                </div>
                <div className="col-12 col-md-6">
                  <CampoTexto id="apellidos" etiqueta="Apellidos" obligatorio valor={datos.apellidos} onCambiar={cambiarCampo} error={errores.apellidos || ""} />
                </div>
              </div>
              <CampoTexto id="correo" etiqueta="Correo" tipo="email" obligatorio valor={datos.correo} onCambiar={cambiarCampo} error={errores.correo || ""} />
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5 mb-3">Direccion de entrega</h2>
              <div className="row">
                <div className="col-12 col-md-8">
                  <CampoTexto id="calle" etiqueta="Calle y numero" obligatorio valor={datos.calle} onCambiar={cambiarCampo} error={errores.calle || ""} />
                </div>
                <div className="col-12 col-md-4">
                  <CampoTexto id="departamento" etiqueta="Departamento" valor={datos.departamento} onCambiar={cambiarCampo} error={errores.departamento || ""} ayuda="Opcional" />
                </div>
              </div>
              <SelectorRegion
                region={datos.region}
                comuna={datos.comuna}
                onCambiar={cambiarCampo}
                errorRegion={errores.region || ""}
                errorComuna={errores.comuna || ""}
              />
              <CampoTexto id="indicaciones" etiqueta="Indicaciones para la entrega" multilinea valor={datos.indicaciones} onCambiar={cambiarCampo} error={errores.indicaciones || ""} ayuda="Por ejemplo: dejar en conserjeria." />
            </div>
          </div>
        </div>

        <aside className="col-12 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5">Tu pedido</h2>
              <ul className="list-unstyled small mb-3">
                {lineas.map((l) => (
                  <li className="d-flex justify-content-between border-bottom py-2" key={l.id}>
                    <span>{l.cantidad} x {l.nombre}</span>
                    <span>{formatoPrecio(l.subtotal)}</span>
                  </li>
                ))}
              </ul>

              <dl className="row mb-3">
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
                <dt className="col-7 fs-5">Total a pagar</dt>
                <dd className="col-5 text-end fs-5 fw-bold">{formatoPrecio(resumen.total)}</dd>
              </dl>

              <div className="form-check mb-3 p-2 ps-5 rounded bg-light border">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="simularRechazo"
                  checked={simularRechazo}
                  onChange={(e) => setSimularRechazo(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="simularRechazo">
                  Simular pago rechazado (solo para probar la pagina de error)
                </label>
              </div>

              <button className="btn btn-primary w-100 btn-lg" type="submit">
                Pagar {formatoPrecio(resumen.total)}
              </button>
              <Link className="btn btn-link w-100 mt-1" to="/carrito">Volver al carrito</Link>
            </div>
          </div>
        </aside>
      </form>
    </section>
  );
}
