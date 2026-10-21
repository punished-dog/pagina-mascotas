import { Link, useParams } from "react-router-dom";
import { obtenerBlog } from "../../data/blogs";

export default function DetalleBlog() {
  const { id } = useParams();
  const blog = obtenerBlog(id);

  if (blog === null) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3">No encontramos esa noticia</h1>
        <Link className="btn btn-primary mt-2" to="/blogs">Volver a los blogs</Link>
      </section>
    );
  }

  return (
    <article className="container py-4" style={{ maxWidth: "820px" }}>
      <Link className="small" to="/blogs"><i className="bi bi-arrow-left me-1"></i>Volver a los blogs</Link>
      <span className="badge bg-marca-suave text-dark d-table mt-3 mb-2">{blog.etiqueta}</span>
      <h1 className="h2">{blog.titulo}</h1>
      <img className="img-fluid rounded-4 w-100 my-3" src={blog.imagen} alt={blog.alt} />

      {blog.secciones.map((seccion, indice) => (
        <section key={indice} className="mb-3">
          {seccion.titulo && <h2 className="h4 mt-4">{seccion.titulo}</h2>}
          {seccion.parrafos && seccion.parrafos.map((parrafo) => <p key={parrafo}>{parrafo}</p>)}
          {seccion.lista && seccion.numerada && (
            <ol>
              {seccion.lista.map((elemento) => <li key={elemento}>{elemento}</li>)}
            </ol>
          )}
          {seccion.lista && !seccion.numerada && (
            <ul>
              {seccion.lista.map((elemento) => <li key={elemento}>{elemento}</li>)}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
