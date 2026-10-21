import { SesionProvider } from "./context/SesionContext";
import { CarritoProvider } from "./context/CarritoContext";

export default function App() {
  return (
    <SesionProvider>
      <CarritoProvider>
        <main className="container py-5 text-center">
          <img src="/fotos/logo.png" alt="logo de GuauMiau" width="120" />
          <h1 className="mt-3">GuauMiau</h1>
          <p className="text-secondary">Tienda de mascotas, ahora en React.</p>
        </main>
      </CarritoProvider>
    </SesionProvider>
  );
}
