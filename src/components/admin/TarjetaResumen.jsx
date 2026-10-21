export default function TarjetaResumen({ titulo, valor, icono, color = "warning", detalle = "" }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex align-items-center gap-3">
        <div className={"rounded-3 p-3 bg-" + color + "-subtle text-" + color + "-emphasis"}>
          <i className={"bi " + icono + " fs-4"}></i>
        </div>
        <div>
          <p className="small text-secondary mb-0">{titulo}</p>
          <p className="h4 mb-0">{valor}</p>
          {detalle !== "" && <p className="small text-secondary mb-0">{detalle}</p>}
        </div>
      </div>
    </div>
  );
}
