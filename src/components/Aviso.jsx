import { useEffect, useRef } from "react";

export default function Aviso({ mensaje, tipo = "exito", onCerrar, duracion = 2500 }) {
  const cerrar = useRef(onCerrar);
  cerrar.current = onCerrar;

  useEffect(() => {
    if (!mensaje) {
      return undefined;
    }
    const temporizador = setTimeout(() => cerrar.current(), duracion);
    return () => clearTimeout(temporizador);
  }, [mensaje, duracion]);

  if (!mensaje) {
    return null;
  }

  const color = tipo === "error" ? "text-bg-danger" : "text-bg-dark";

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div className={"toast show align-items-center border-0 " + color} role="status">
        <div className="d-flex">
          <div className="toast-body">{mensaje}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Cerrar aviso"
            onClick={onCerrar}
          ></button>
        </div>
      </div>
    </div>
  );
}
