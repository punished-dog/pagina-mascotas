import { regiones, comunasDe } from "../data/regiones";

export default function SelectorRegion({ region, comuna, onCambiar, errorRegion = "", errorComuna = "" }) {
  const comunas = comunasDe(region);

  function cambiarRegion(valor) {
    onCambiar("region", valor);
    onCambiar("comuna", "");
  }

  return (
    <div className="row">
      <div className="col-12 col-md-6 mb-3">
        <label className="form-label" htmlFor="region">Region<span className="text-danger"> *</span></label>
        <select
          id="region"
          className={"form-select" + (errorRegion !== "" ? " is-invalid" : "")}
          value={region}
          onChange={(e) => cambiarRegion(e.target.value)}
        >
          <option value="">Selecciona una region</option>
          {regiones.map((r) => (
            <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
          ))}
        </select>
        {errorRegion !== "" && <div className="invalid-feedback">{errorRegion}</div>}
      </div>

      <div className="col-12 col-md-6 mb-3">
        <label className="form-label" htmlFor="comuna">Comuna<span className="text-danger"> *</span></label>
        <select
          id="comuna"
          className={"form-select" + (errorComuna !== "" ? " is-invalid" : "")}
          value={comuna}
          onChange={(e) => onCambiar("comuna", e.target.value)}
          disabled={region === ""}
        >
          <option value="">{region === "" ? "Primero elige la region" : "Selecciona una comuna"}</option>
          {comunas.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errorComuna !== "" && <div className="invalid-feedback">{errorComuna}</div>}
      </div>
    </div>
  );
}
