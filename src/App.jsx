import { Routes, Route } from "react-router-dom";
import { SesionProvider } from "./context/SesionContext";
import { CarritoProvider } from "./context/CarritoContext";
import LayoutTienda from "./components/LayoutTienda";
import Home from "./pages/tienda/Home";
import NoEncontrado from "./pages/tienda/NoEncontrado";

export default function App() {
  return (
    <SesionProvider>
      <CarritoProvider>
        <Routes>
          <Route element={<LayoutTienda />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NoEncontrado />} />
          </Route>
        </Routes>
      </CarritoProvider>
    </SesionProvider>
  );
}
