export default function FiltroCategorias({ categorias, seleccionada, onSeleccionar }) {
  const opciones = [{ id: 0, nombre: "Todas" }, ...categorias];

  return (
    <div className="list-group">
      {opciones.map((categoria) => {
        const valor = categoria.id === 0 ? "" : categoria.nombre;
        const activa = seleccionada === valor;
        return (
          <button
            key={categoria.id}
            type="button"
            className={"list-group-item list-group-item-action" + (activa ? " active" : "")}
            aria-pressed={activa}
            onClick={() => onSeleccionar(valor)}
          >
            {categoria.nombre}
          </button>
        );
      })}
    </div>
  );
}
