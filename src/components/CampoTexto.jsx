export default function CampoTexto({
  id,
  etiqueta,
  valor,
  onCambiar,
  error = "",
  tipo = "text",
  obligatorio = false,
  ayuda = "",
  multilinea = false,
  ...resto
}) {
  const clase = "form-control" + (error !== "" ? " is-invalid" : "");
  const propiedades = {
    id,
    name: id,
    className: clase,
    value: valor,
    onChange: (e) => onCambiar(id, e.target.value),
    "aria-invalid": error !== "",
    "aria-describedby": error !== "" ? "error-" + id : undefined,
    ...resto
  };

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {etiqueta}
        {obligatorio && <span className="text-danger"> *</span>}
      </label>
      {multilinea ? <textarea rows="3" {...propiedades} /> : <input type={tipo} {...propiedades} />}
      {ayuda !== "" && error === "" && <div className="form-text">{ayuda}</div>}
      {error !== "" && (
        <div className="invalid-feedback" id={"error-" + id}>{error}</div>
      )}
    </div>
  );
}
