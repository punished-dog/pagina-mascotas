import { Link, Navigate, useLocation } from "react-router-dom";
import { useSesion } from "../context/SesionContext";

export default function RutaProtegida({ children, soloAdmin = false }) {
  const { usuario, esAdmin, puedeEntrarPanel } = useSesion();
  const { pathname } = useLocation();

  if (usuario === null) {
    return <Navigate to={"/login?volver=" + pathname} replace />;
  }

  if (!puedeEntrarPanel || (soloAdmin && !esAdmin)) {
    return (
      <section className="container py-5 text-center">
        <i className="bi bi-shield-lock display-4 text-secondary"></i>
        <h1 className="h3 mt-3">Acceso restringido</h1>
        <p className="text-secondary">Tu cuenta no tiene permisos para ver esta seccion.</p>
        <Link className="btn btn-primary" to={puedeEntrarPanel ? "/admin" : "/"}>Volver</Link>
      </section>
    );
  }

  return children;
}
