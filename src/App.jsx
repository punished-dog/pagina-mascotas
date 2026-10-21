import { Routes, Route } from "react-router-dom";
import { SesionProvider } from "./context/SesionContext";
import { CarritoProvider } from "./context/CarritoContext";
import LayoutTienda from "./components/LayoutTienda";
import Home from "./pages/tienda/Home";
import Productos from "./pages/tienda/Productos";
import DetalleProducto from "./pages/tienda/DetalleProducto";
import Categorias from "./pages/tienda/Categorias";
import Ofertas from "./pages/tienda/Ofertas";
import Carrito from "./pages/tienda/Carrito";
import Checkout from "./pages/tienda/Checkout";
import CompraExito from "./pages/tienda/CompraExito";
import CompraError from "./pages/tienda/CompraError";
import NoEncontrado from "./pages/tienda/NoEncontrado";

export default function App() {
  return (
    <SesionProvider>
      <CarritoProvider>
        <Routes>
          <Route element={<LayoutTienda />}>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/:nombre" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/compra/exito/:id" element={<CompraExito />} />
            <Route path="/compra/error/:id" element={<CompraError />} />
            <Route path="*" element={<NoEncontrado />} />
          </Route>
        </Routes>
      </CarritoProvider>
    </SesionProvider>
  );
}
