import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuLateral from "./MenuLateral";
import { useSesion } from "../../context/SesionContext";

export default function LayoutAdmin() {
  const { usuario, esAdmin, cerrarSesion } = useSesion();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function salir() {
    cerrarSesion();
    navigate("/");
  }

  return (
    <div className="min-vh-100 d-flex flex-column flex-lg-row bg-light">
      <aside className="panel-lateral bg-white border-end">
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <Link className="d-flex align-items-center gap-2 text-decoration-none link-dark fw-bold" to="/admin">
            <img src="/fotos/logo.png" alt="" width="36" height="36" className="rounded-circle" />
            GuauMiau <span className="badge bg-marca-suave text-dark fw-normal">Panel</span>
          </Link>
          <button
            className="btn btn-outline-secondary btn-sm d-lg-none"
            type="button"
            aria-label={menuAbierto ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <i className={"bi " + (menuAbierto ? "bi-x-lg" : "bi-list")}></i>
          </button>
        </div>
        <div className={"p-3 " + (menuAbierto ? "d-block" : "d-none d-lg-block")}>
          <MenuLateral esAdmin={esAdmin} onNavegar={() => setMenuAbierto(false)} />
        </div>
      </aside>

      <div className="flex-grow-1 d-flex flex-column min-w-0">
        <header className="bg-white border-bottom px-3 px-lg-4 py-2 d-flex flex-wrap align-items-center justify-content-end gap-2">
          <span className="me-auto small text-secondary">
            <i className="bi bi-person-badge me-1"></i>
            {usuario.nombre} {usuario.apellidos} · <strong>{usuario.tipo}</strong>
          </span>
          <Link className="btn btn-sm btn-outline-secondary" to="/">
            <i className="bi bi-shop me-1"></i>Ver tienda
          </Link>
          <button className="btn btn-sm btn-outline-danger" type="button" onClick={salir}>
            <i className="bi bi-box-arrow-right me-1"></i>Cerrar sesion
          </button>
        </header>
        <main className="flex-grow-1 p-3 p-lg-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
