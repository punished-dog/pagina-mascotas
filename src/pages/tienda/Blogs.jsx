import { Link } from "react-router-dom";
import { blogs } from "../../data/blogs";

export default function Blogs() {
  return (
    <section className="container py-4">
      <h1 className="h2 mb-1">Noticias importantes</h1>
      <p className="text-secondary mb-4">Consejos y casos curiosos sobre el cuidado de perros y gatos.</p>

      <div className="d-flex flex-column gap-4">
        {blogs.map((blog) => (
          <article className="card shadow-sm overflow-hidden" key={blog.id}>
            <div className="row g-0">
              <div className="col-12 col-md-4">
                <img className="img-fluid h-100 w-100 imagen-blog" src={blog.imagen} alt={blog.alt} />
              </div>
              <div className="col-12 col-md-8">
                <div className="card-body p-4">
                  <span className="badge bg-marca-suave text-dark mb-2">{blog.etiqueta}</span>
                  <h2 className="h4">{blog.titulo}</h2>
                  <p className="text-secondary">{blog.resumen}</p>
                  <Link className="btn btn-outline-primary" to={"/blogs/" + blog.id}>Ver caso</Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
