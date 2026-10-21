import TarjetaProducto from "./TarjetaProducto";

export default function ListaProductos({
  productos,
  onAgregar,
  mensajeVacio = "No hay productos para mostrar.",
  columnas = "col-6 col-md-4 col-lg-3"
}) {
  if (productos.length === 0) {
    return <p className="text-center text-secondary py-5 mb-0">{mensajeVacio}</p>;
  }

  return (
    <div className="row g-3">
      {productos.map((producto) => (
        <div className={columnas} key={producto.id}>
          <TarjetaProducto producto={producto} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  );
}
