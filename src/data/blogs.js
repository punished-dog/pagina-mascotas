export const blogs = [
  {
    id: 1,
    etiqueta: "Caso curioso #1",
    titulo: "Como saber si tu mascota esta pasando frio",
    resumen: "Los perros pierden mas calor de lo que creemos en invierno, sobre todo los de pelo corto. Te contamos como saber si tu mascota esta pasando frio en la casa.",
    imagen: "/fotos/blog1.png",
    alt: "perro abrigado en invierno",
    secciones: [
      {
        parrafos: [
          "En Santiago las noches de invierno bajan bastante de temperatura y muchas mascotas duermen en el patio o cerca de una ventana. Los perros de pelo corto, los cachorros y los animales mayores son los que mas lo sufren, porque les cuesta mas regular su temperatura."
        ]
      },
      {
        titulo: "Señales que hay que mirar",
        lista: [
          "Duerme enrollado y muy pegado a la pared o a los muebles.",
          "Tirita cuando esta quieto, aunque no este mojado.",
          "Busca estar arriba de la ropa, alfombras o encima de las personas.",
          "Toma menos agua y se mueve menos de lo normal."
        ]
      },
      {
        titulo: "Que se puede hacer",
        parrafos: [
          "Lo primero es sacar la cama del suelo frio y ponerla lejos de las corrientes de aire. Una cama acolchada con funda lavable ayuda harto, porque el relleno mantiene el calor del mismo cuerpo del animal. Si la mascota duerme afuera, la casa tiene que estar levantada del piso y con la entrada tapada del viento.",
          "Tambien conviene secar bien a la mascota despues del baño y dejar el baño para las horas de mas sol. En nuestro local hacemos baño con secado incluido, asi el animal no sale mojado a la calle.",
          "Si notas que tirita incluso dentro de la casa o que se queda muy quieto, lo mejor es ir al veterinario, porque el frio puede empeorar problemas de articulaciones en perros y gatos mayores."
        ]
      }
    ]
  },
  {
    id: 2,
    etiqueta: "Caso curioso #2",
    titulo: "Cinco preguntas antes de adoptar",
    resumen: "Adoptar no es solo llevarse un animal a la casa. Estas son las preguntas que conviene responder antes de adoptar un perro o un gato.",
    imagen: "/fotos/blog2.png",
    alt: "gato adoptado",
    secciones: [
      {
        parrafos: [
          "Cada año llegan al local familias que adoptaron en una feria del barrio y despues se dan cuenta de que el animal necesitaba mas tiempo o mas espacio del que pensaban. Adoptar es una buena decision, pero conviene conversarla antes en la casa."
        ]
      },
      {
        titulo: "Las preguntas",
        numerada: true,
        lista: [
          "Cuantas horas al dia va a quedar solo el animal?",
          "Hay alguien en la casa con alergia a los perros o gatos?",
          "El departamento o la casa permite mascotas y tiene espacio para que se mueva?",
          "Alcanza el presupuesto mensual para alimento, vacunas y desparasitacion?",
          "Quien se hace cargo si la familia sale de vacaciones?"
        ]
      },
      {
        parrafos: [
          "Si las respuestas son claras, el siguiente paso es preparar la casa antes de que llegue: una cama, comedero, bebedero, alimento segun su edad y un par de juguetes para que se entretenga los primeros dias."
        ]
      },
      {
        titulo: "Los primeros dias",
        parrafos: [
          "Es normal que un animal recien adoptado se esconda o no coma mucho las primeras 48 horas. Lo mejor es dejarlo tranquilo, mantener los horarios de comida y no recibir visitas hasta que se acostumbre. La visita al veterinario dentro de la primera semana sirve para revisar vacunas y chequear su estado general."
        ]
      }
    ]
  }
];

export function obtenerBlog(id) {
  const encontrado = blogs.find((b) => b.id === Number(id));
  return encontrado || null;
}
