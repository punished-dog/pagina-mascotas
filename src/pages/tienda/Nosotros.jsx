const tarjetas = [
  {
    icono: "bi-shop",
    titulo: "Historia",
    texto: "La tienda se creo el año 2010 en Santiago. Sus fundadores son amantes de los animales y partieron vendiendo alimento a los vecinos del barrio."
  },
  {
    icono: "bi-geo-alt",
    titulo: "Ubicacion",
    texto: "Tenemos un solo local, ubicado en Av. Don Ramon 1234, Santiago. Horario: lunes a sabado de 10:00 a 20:00."
  },
  {
    icono: "bi-heart",
    titulo: "Que hacemos",
    texto: "Vendemos alimento, juguetes y accesorios, y ademas damos servicios de peluqueria, baño y vacunas con hora reservada."
  }
];

const referencias = [
  { nombre: "SAG", enlace: "https://www.sag.gob.cl/" },
  { nombre: "Colegio Medico Veterinario", enlace: "https://www.colegiomedicoveterinario.cl/" },
  { nombre: "WSAVA", enlace: "https://www.wsava.org/" }
];

export default function Nosotros() {
  return (
    <section className="container py-4">
      <h1 className="h2 mb-3">Nosotros</h1>
      <img className="img-fluid rounded-4 w-100 mb-4 banner-nosotros" src="/fotos/mascotas-nosotros.png" alt="banner de mascotas" />

      <div className="row g-4 mb-4">
        {tarjetas.map((tarjeta) => (
          <div className="col-12 col-md-4" key={tarjeta.titulo}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5"><i className={"bi " + tarjeta.icono + " text-marca me-2"}></i>{tarjeta.titulo}</h2>
                <p className="mb-0 text-secondary">{tarjeta.texto}</p>
              </div>
            </article>
          </div>
        ))}
      </div>

      <article className="card shadow-sm">
        <div className="card-body">
          <h2 className="h5">Referencias</h2>
          <p className="text-secondary">Nos guiamos por las recomendaciones de estas instituciones para el cuidado de tu mascota.</p>
          <ul className="mb-0">
            {referencias.map((r) => (
              <li key={r.nombre}><a href={r.enlace} target="_blank" rel="noreferrer">{r.nombre}</a></li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
