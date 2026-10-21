export default function Contador({ valor, minimo = 1, maximo, onCambiar }) {
  const puedeRestar = valor > minimo;
  const puedeSumar = maximo === undefined || valor < maximo;

  return (
    <div className="input-group input-group-sm contador">
      <button
        className="btn btn-outline-secondary"
        type="button"
        aria-label="Restar"
        disabled={!puedeRestar}
        onClick={() => onCambiar(valor - 1)}
      >
        <i className="bi bi-dash"></i>
      </button>
      <span className="form-control text-center" aria-label="Cantidad">{valor}</span>
      <button
        className="btn btn-outline-secondary"
        type="button"
        aria-label="Sumar"
        disabled={!puedeSumar}
        onClick={() => onCambiar(valor + 1)}
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
}
