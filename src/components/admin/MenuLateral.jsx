import { NavLink } from "react-router-dom";

export const opcionesMenu = [
  { ruta: "/admin", texto: "Dashboard", icono: "bi-speedometer2", soloAdmin: false, exacta: true },
  { ruta: "/admin/ordenes", texto: "Ordenes", icono: "bi-receipt", soloAdmin: false },
  { ruta: "/admin/productos", texto: "Productos", icono: "bi-box-seam", soloAdmin: false },
  { ruta: "/admin/categorias", texto: "Categorias", icono: "bi-tags", soloAdmin: true },
  { ruta: "/admin/usuarios", texto: "Usuarios", icono: "bi-people", soloAdmin: true },
  { ruta: "/admin/reportes", texto: "Reportes", icono: "bi-bar-chart", soloAdmin: true },
  { ruta: "/admin/perfil", texto: "Perfil", icono: "bi-person-circle", soloAdmin: false }
];

export default function MenuLateral({ esAdmin, onNavegar }) {
  const visibles = opcionesMenu.filter((opcion) => esAdmin || !opcion.soloAdmin);

  return (
    <nav className="nav nav-pills flex-column gap-1 menu-admin" aria-label="Menu del panel">
      {visibles.map((opcion) => (
        <NavLink
          key={opcion.ruta}
          to={opcion.ruta}
          end={opcion.exacta}
          className="nav-link"
          onClick={onNavegar}
        >
          <i className={"bi " + opcion.icono + " me-2"}></i>
          {opcion.texto}
        </NavLink>
      ))}
    </nav>
  );
}
