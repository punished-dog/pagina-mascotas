export default function Confirmacion({ abierta, titulo, mensaje, textoConfirmar = "Eliminar", onConfirmar, onCancelar }) {
  if (!abierta) {
    return null;
  }

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="tituloConfirmacion">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="tituloConfirmacion">{titulo}</h2>
              <button className="btn-close" type="button" aria-label="Cerrar" onClick={onCancelar}></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">{mensaje}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" type="button" onClick={onCancelar}>Cancelar</button>
              <button className="btn btn-danger" type="button" onClick={onConfirmar}>{textoConfirmar}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
}
