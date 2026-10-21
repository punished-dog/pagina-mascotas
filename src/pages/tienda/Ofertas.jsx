import ListaProductos from "../../components/ListaProductos";
import { productosEnOferta } from "../../data/productos";
import { useAgregarAlCarrito } from "../../hooks/useAgregarAlCarrito";

export default function Ofertas() {
  const { agregarProducto, elementoAviso } = useAgregarAlCarrito();
  const ofertas = productosEnOferta().sort((a, b) => b.oferta - a.oferta);

  return (
    <section className="container py-4">
      <div className="bg-marca-suave rounded-4 p-4 mb-4">
        <h1 className="h2 mb-1">Ofertas</h1>
        <p className="text-secondary mb-0">
          Productos con descuento por tiempo limitado. Ademas puedes usar el cupon GUAUMIAU10 en el carrito.
        </p>
      </div>

      <ListaProductos
        productos={ofertas}
        onAgregar={(p) => agregarProducto(p)}
        mensajeVacio="Por ahora no hay productos en oferta."
      />

      {elementoAviso}
    </section>
  );
}
