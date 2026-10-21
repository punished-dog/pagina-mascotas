import { useState } from "react";
import TarjetaResumen from "../../components/admin/TarjetaResumen";
import { listarOrdenes } from "../../data/ordenes";
import { listarProductos } from "../../data/productos";
import { resumenVentas, ventasPorProducto, ventasPorCategoria, ventasPorDia, convertirCsv, descargarCsv } from "../../utils/reportes";
import { formatoPrecio } from "../../utils/formato";

function BarraHorizontal({ etiqueta, valor, maximo, texto }) {
  const porcentaje = maximo === 0 ? 0 : Math.round((valor / maximo) * 100);
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between small mb-1">
        <span>{etiqueta}</span>
        <span className="fw-semibold">{texto}</span>
      </div>
      <div className="progress" role="progressbar" aria-label={etiqueta} aria-valuenow={porcentaje} aria-valuemin="0" aria-valuemax="100" style={{ height: "10px" }}>
        <div className="progress-bar bg-warning" style={{ width: porcentaje + "%" }}></div>
      </div>
    </div>
  );
}

export default function Reportes() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const ordenes = listarOrdenes().filter((o) => {
    const dia = o.fecha.slice(0, 10);
    return (desde === "" || dia >= desde) && (hasta === "" || dia <= hasta);
  });
  const resumen = resumenVentas(ordenes);
  const porProducto = ventasPorProducto(ordenes, listarProductos());
  const porCategoria = ventasPorCategoria(porProducto);
  const porDia = ventasPorDia(ordenes);
  const top = porProducto.filter((f) => f.unidades > 0).slice(0, 5);
  const maxCategoria = Math.max(0, ...porCategoria.map((c) => c.ingresos));
  const maxDia = Math.max(0, ...porDia.map((d) => d.total));
  const maxTop = top.length > 0 ? top[0].unidades : 0;

  function exportar() {
    const columnas = [
      { campo: "dia", titulo: "Dia" },
      { campo: "total", titulo: "Ventas" }
    ];
    descargarCsv("ventas-por-dia.csv", convertirCsv(porDia, columnas));
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
        <h1 className="h3 mb-0">Reportes de ventas</h1>
        <div className="d-flex flex-wrap gap-2 align-items-end">
          <div>
            <label className="form-label small mb-0" htmlFor="desde">Desde</label>
            <input id="desde" className="form-control form-control-sm" type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
          </div>
          <div>
            <label className="form-label small mb-0" htmlFor="hasta">Hasta</label>
            <input id="hasta" className="form-control form-control-sm" type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
          </div>
          <button className="btn btn-sm btn-outline-success" type="button" onClick={exportar}>
            <i className="bi bi-download me-1"></i>CSV
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <TarjetaResumen titulo="Total vendido" valor={formatoPrecio(resumen.total)} icono="bi-cash-coin" color="success" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <TarjetaResumen titulo="Ordenes pagadas" valor={resumen.pagadas} icono="bi-bag-check" color="primary" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <TarjetaResumen titulo="Ticket promedio" valor={formatoPrecio(resumen.promedio)} icono="bi-calculator" color="warning" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <TarjetaResumen titulo="Pagos rechazados" valor={resumen.rechazadas} icono="bi-x-octagon" color="danger" />
        </div>
      </div>

      {resumen.pagadas === 0 ? (
        <div className="alert alert-info">No hay ventas en el rango de fechas elegido.</div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-xl-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="h6 mb-0">Ventas por categoria</h2>
                <p className="small text-secondary mb-3">Suma de los productos vendidos, sin cupones ni despacho.</p>
                {porCategoria.map((c) => (
                  <BarraHorizontal key={c.categoria} etiqueta={c.categoria} valor={c.ingresos} maximo={maxCategoria} texto={formatoPrecio(c.ingresos)} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="h6 mb-3">Productos mas vendidos</h2>
                {top.map((f) => (
                  <BarraHorizontal key={f.id} etiqueta={f.nombre} valor={f.unidades} maximo={maxTop} texto={f.unidades + " un."} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h2 className="h6 mb-3">Ventas por dia</h2>
                {porDia.map((d) => (
                  <BarraHorizontal key={d.dia} etiqueta={d.dia.split("-").reverse().join("-")} valor={d.total} maximo={maxDia} texto={formatoPrecio(d.total)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
