import { formatoFecha, formatoPrecio } from "../utils/formato";

export default function Boleta({ orden }) {
  const { cliente, direccion } = orden;

  return (
    <div className="card shadow-sm boleta">
      <div className="card-header bg-white d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div>
          <h2 className="h5 mb-0">Boleta N° {orden.id}</h2>
          <small className="text-secondary">{formatoFecha(orden.fecha)}</small>
        </div>
        <span className={"badge " + (orden.estado === "Pagada" ? "text-bg-success" : "text-bg-danger")}>
          {orden.estado}
        </span>
      </div>

      <div className="card-body">
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <h3 className="h6 text-secondary text-uppercase">Cliente</h3>
            <p className="mb-0">{cliente.nombre} {cliente.apellidos}</p>
            <p className="mb-0 small text-secondary">{cliente.correo}</p>
          </div>
          <div className="col-12 col-md-6">
            <h3 className="h6 text-secondary text-uppercase">Direccion de entrega</h3>
            <p className="mb-0">
              {direccion.calle}
              {direccion.departamento !== "" && ", depto " + direccion.departamento}
            </p>
            <p className="mb-0 small text-secondary">{direccion.comuna}, {direccion.region}</p>
            {direccion.indicaciones !== "" && (
              <p className="mb-0 small text-secondary">Indicaciones: {direccion.indicaciones}</p>
            )}
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Producto</th>
                <th scope="col" className="text-end">Precio</th>
                <th scope="col" className="text-center">Cantidad</th>
                <th scope="col" className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img src={item.imagen} alt="" width="40" height="40" style={{ objectFit: "contain" }} />
                      {item.nombre}
                    </div>
                  </td>
                  <td className="text-end">{formatoPrecio(item.precio)}</td>
                  <td className="text-center">{item.cantidad}</td>
                  <td className="text-end">{formatoPrecio(item.precio * item.cantidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-footer bg-white">
        <dl className="row mb-0 ms-auto" style={{ maxWidth: "360px" }}>
          <dt className="col-7 fw-normal">Subtotal</dt>
          <dd className="col-5 text-end mb-1">{formatoPrecio(orden.subtotal)}</dd>
          {orden.descuento > 0 && (
            <>
              <dt className="col-7 fw-normal">Descuento {orden.cupon}</dt>
              <dd className="col-5 text-end mb-1 text-success">-{formatoPrecio(orden.descuento)}</dd>
            </>
          )}
          <dt className="col-7 fw-normal">Despacho</dt>
          <dd className="col-5 text-end mb-1">{orden.despacho === 0 ? "Gratis" : formatoPrecio(orden.despacho)}</dd>
          <dt className="col-7">Total</dt>
          <dd className="col-5 text-end mb-0 fw-bold">{formatoPrecio(orden.total)}</dd>
        </dl>
      </div>
    </div>
  );
}
