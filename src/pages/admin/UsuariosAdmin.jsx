import { useState } from "react";
import { Link } from "react-router-dom";
import Confirmacion from "../../components/admin/Confirmacion";
import Aviso from "../../components/Aviso";
import { tiposUsuario } from "../../components/admin/FormularioUsuario";
import { listarUsuarios, eliminarUsuario } from "../../data/usuarios";
import { useSesion } from "../../context/SesionContext";

const coloresTipo = {
  Administrador: "text-bg-dark",
  Vendedor: "text-bg-info",
  Cliente: "text-bg-light border"
};

export default function UsuariosAdmin() {
  const { usuario } = useSesion();
  const [usuarios, setUsuarios] = useState(() => listarUsuarios());
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("");
  const [aEliminar, setAEliminar] = useState(null);
  const [aviso, setAviso] = useState("");
  const buscado = texto.trim().toLowerCase();

  const filtrados = usuarios.filter(
    (u) =>
      (tipo === "" || u.tipo === tipo) &&
      (buscado === "" ||
        u.run.toLowerCase().includes(buscado) ||
        (u.nombre + " " + u.apellidos).toLowerCase().includes(buscado) ||
        u.correo.toLowerCase().includes(buscado))
  );

  function confirmarEliminar() {
    eliminarUsuario(aEliminar.run);
    setUsuarios(listarUsuarios());
    setAviso("Se elimino a " + aEliminar.nombre + " " + aEliminar.apellidos);
    setAEliminar(null);
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">Usuarios</h1>
        <Link className="btn btn-sm btn-primary" to="/admin/usuarios/nuevo">
          <i className="bi bi-person-plus me-1"></i>Nuevo usuario
        </Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body row g-2">
          <div className="col-12 col-md-8">
            <input className="form-control" type="search" placeholder="Buscar por run, nombre o correo" aria-label="Buscar usuario" value={texto} onChange={(e) => setTexto(e.target.value)} />
          </div>
          <div className="col-12 col-md-4">
            <select className="form-select" aria-label="Filtrar por tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="">Todos los tipos</option>
              {tiposUsuario.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Run</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Tipo</th>
                <th scope="col" className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-secondary py-4">No hay usuarios que coincidan.</td>
                </tr>
              )}
              {filtrados.map((u) => (
                <tr key={u.run}>
                  <td className="small">{u.run}</td>
                  <td>{u.nombre} {u.apellidos}</td>
                  <td>{u.correo}</td>
                  <td><span className={"badge " + coloresTipo[u.tipo]}>{u.tipo}</span></td>
                  <td className="text-end text-nowrap">
                    <Link className="btn btn-sm btn-outline-secondary" to={"/admin/usuarios/" + u.run} aria-label={"Ver " + u.nombre}>
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link className="btn btn-sm btn-outline-primary ms-1" to={"/admin/usuarios/" + u.run + "/editar"} aria-label={"Editar " + u.nombre}>
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger ms-1"
                      type="button"
                      aria-label={"Eliminar " + u.nombre}
                      disabled={u.run === usuario.run}
                      title={u.run === usuario.run ? "No puedes eliminar tu propia cuenta" : ""}
                      onClick={() => setAEliminar(u)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Confirmacion
        abierta={aEliminar !== null}
        titulo="Eliminar usuario"
        mensaje={aEliminar ? "¿Seguro que quieres eliminar la cuenta de " + aEliminar.nombre + " " + aEliminar.apellidos + "?" : ""}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setAEliminar(null)}
      />
      <Aviso mensaje={aviso} onCerrar={() => setAviso("")} />
    </>
  );
}
