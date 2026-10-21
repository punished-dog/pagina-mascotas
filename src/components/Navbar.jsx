import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useSesion } from "../context/SesionContext";
import { listarCategorias } from "../data/categorias";
import { formatoPrecio } from "../utils/formato";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasAbierto, setCategoriasAbierto] = useState(false);
  const [usuarioAbierto, setUsuarioAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const { resumen, unidades } = useCarrito();
  const { usuario, puedeEntrarPanel, cerrarSesion } = useSesion();
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const categorias = listarCategorias();

  useEffect(() => {
    setMenuAbierto(false);
    setCategoriasAbierto(false);
    setUsuarioAbierto(false);
  }, [ubicacion.pathname, ubicacion.search]);

  function buscar(evento) {
    evento.preventDefault();
    navigate("/productos?buscar=" + encodeURIComponent(busqueda.trim()));
  }

  function salir() {
    cerrarSesion();
    navigate("/");
  }

  const formularioBusqueda = (
    <form className="d-flex" role="search" onSubmit={buscar}>
      <input
        className="form-control form-control-sm me-2"
        type="search"
        placeholder="Buscar productos"
        aria-label="Buscar productos"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button className="btn btn-sm btn-outline-primary" type="submit">Buscar</button>
    </form>
  );

  const botonesSesion =
    usuario === null ? (
      <div className="d-flex gap-2">
        <Link className="btn btn-sm btn-outline-primary" to="/login">Iniciar sesion</Link>
        <Link className="btn btn-sm btn-primary" to="/registro">Crear cuenta</Link>
      </div>
    ) : (
      <div className="dropdown">
        <button
          className="btn btn-sm btn-outline-secondary dropdown-toggle"
          type="button"
          aria-expanded={usuarioAbierto}
          onClick={() => setUsuarioAbierto(!usuarioAbierto)}
        >
          <i className="bi bi-person-circle me-1"></i>
          {usuario.nombre}
        </button>
        <ul className={"dropdown-menu dropdown-menu-end" + (usuarioAbierto ? " show" : "")}>
          <li><span className="dropdown-item-text small text-secondary">{usuario.tipo}</span></li>
          {puedeEntrarPanel && (
            <li>
              <Link className="dropdown-item" to="/admin">Panel de administracion</Link>
            </li>
          )}
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button className="dropdown-item" type="button" onClick={salir}>Cerrar sesion</button>
          </li>
        </ul>
      </div>
    );

  return (
    <header className="bg-white border-bottom sticky-top">
      <div className="container d-flex align-items-center gap-3 py-2">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-5 me-auto me-lg-0" to="/">
          <img src="/fotos/logo.png" alt="logo de GuauMiau" width="40" height="40" />
          GuauMiau
        </Link>

        <div className="d-none d-lg-block mx-auto" style={{ width: "360px" }}>
          {formularioBusqueda}
        </div>

        <div className="d-none d-lg-block">{botonesSesion}</div>

        <Link className="btn btn-sm btn-success d-lg-none" to="/carrito" aria-label="Ver carrito">
          <i className="bi bi-cart3"></i>
          <span className="badge text-bg-light ms-1">{unidades}</span>
        </Link>

        <button
          className="btn btn-sm btn-outline-secondary d-lg-none"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <i className={"bi fs-5 " + (menuAbierto ? "bi-x-lg" : "bi-list")}></i>
        </button>
      </div>

      <nav className={"navbar navbar-expand-lg border-top py-1" + (menuAbierto ? "" : " d-none d-lg-flex")}>
        <div className="container">
          <div className={"collapse navbar-collapse" + (menuAbierto ? " show" : "")}>
            <div className="d-lg-none my-2">{formularioBusqueda}</div>

            <ul className="navbar-nav mx-lg-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/productos">Productos</NavLink>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  type="button"
                  aria-expanded={categoriasAbierto}
                  onClick={() => setCategoriasAbierto(!categoriasAbierto)}
                >
                  Categorias
                </button>
                <ul className={"dropdown-menu" + (categoriasAbierto ? " show" : "")}>
                  <li>
                    <Link className="dropdown-item" to="/categorias">Todas las categorias</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  {categorias.map((categoria) => (
                    <li key={categoria.id}>
                      <Link className="dropdown-item" to={"/categorias/" + categoria.nombre}>
                        {categoria.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
              </li>
            </ul>

            <Link className="btn btn-sm btn-success d-none d-lg-inline-block" to="/carrito">
              <i className="bi bi-cart3 me-1"></i>
              Carrito {formatoPrecio(resumen.subtotal)}
              <span className="badge text-bg-light ms-2">{unidades}</span>
            </Link>

            <div className="d-lg-none border-top pt-2 mt-2 mb-2">{botonesSesion}</div>
          </div>
        </div>
      </nav>
    </header>
  );
}
