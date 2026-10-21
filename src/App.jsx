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
import Login from "./pages/tienda/Login";
import Registro from "./pages/tienda/Registro";
import Nosotros from "./pages/tienda/Nosotros";
import Blogs from "./pages/tienda/Blogs";
import DetalleBlog from "./pages/tienda/DetalleBlog";
import Contacto from "./pages/tienda/Contacto";
import NoEncontrado from "./pages/tienda/NoEncontrado";
import RutaProtegida from "./components/RutaProtegida";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import EditorProducto from "./pages/admin/EditorProducto";
import VerProducto from "./pages/admin/VerProducto";
import ProductosCriticos from "./pages/admin/ProductosCriticos";
import ReporteProductos from "./pages/admin/ReporteProductos";
import OrdenesAdmin from "./pages/admin/OrdenesAdmin";
import VerOrden from "./pages/admin/VerOrden";
import CategoriasAdmin from "./pages/admin/CategoriasAdmin";
import EditorCategoria from "./pages/admin/EditorCategoria";

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
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<DetalleBlog />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NoEncontrado />} />
          </Route>

          <Route path="/admin" element={<RutaProtegida><LayoutAdmin /></RutaProtegida>}>
            <Route index element={<Dashboard />} />
            <Route path="productos" element={<ProductosAdmin />} />
            <Route path="productos/nuevo" element={<RutaProtegida soloAdmin><EditorProducto /></RutaProtegida>} />
            <Route path="productos/criticos" element={<ProductosCriticos />} />
            <Route path="productos/reporte" element={<ReporteProductos />} />
            <Route path="productos/:id" element={<VerProducto />} />
            <Route path="productos/:id/editar" element={<RutaProtegida soloAdmin><EditorProducto /></RutaProtegida>} />
            <Route path="ordenes" element={<OrdenesAdmin />} />
            <Route path="ordenes/:id" element={<VerOrden />} />
            <Route path="categorias" element={<RutaProtegida soloAdmin><CategoriasAdmin /></RutaProtegida>} />
            <Route path="categorias/nueva" element={<RutaProtegida soloAdmin><EditorCategoria /></RutaProtegida>} />
            <Route path="categorias/:id/editar" element={<RutaProtegida soloAdmin><EditorCategoria /></RutaProtegida>} />
          </Route>
        </Routes>
      </CarritoProvider>
    </SesionProvider>
  );
}
