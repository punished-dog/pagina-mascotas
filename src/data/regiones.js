export const regiones = [
  {
    nombre: "Region de Arica y Parinacota",
    comunas: ["Arica", "Camarones", "Putre", "General Lagos"]
  },
  {
    nombre: "Region de Tarapaca",
    comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Huara"]
  },
  {
    nombre: "Region de Antofagasta",
    comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "Taltal"]
  },
  {
    nombre: "Region de Atacama",
    comunas: ["Copiapo", "Vallenar", "Caldera", "Chanaral", "Huasco"]
  },
  {
    nombre: "Region de Coquimbo",
    comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuna"]
  },
  {
    nombre: "Region de Valparaiso",
    comunas: ["Valparaiso", "Vina del Mar", "Quilpue", "Villa Alemana", "San Antonio", "Quillota"]
  },
  {
    nombre: "Region Metropolitana de Santiago",
    comunas: ["Santiago", "Puente Alto", "Maipu", "La Florida", "Providencia", "Las Condes", "Pudahuel", "San Bernardo", "Nunoa"]
  },
  {
    nombre: "Region del Libertador General Bernardo O'Higgins",
    comunas: ["Rancagua", "San Fernando", "Santa Cruz", "Machali", "Rengo"]
  },
  {
    nombre: "Region del Maule",
    comunas: ["Talca", "Curico", "Linares", "Cauquenes", "Longavi"]
  },
  {
    nombre: "Region de Nuble",
    comunas: ["Chillan", "Chillan Viejo", "San Carlos", "Bulnes", "Quirihue"]
  },
  {
    nombre: "Region del Biobio",
    comunas: ["Concepcion", "Talcahuano", "Los Angeles", "Chiguayante", "Coronel"]
  },
  {
    nombre: "Region de La Araucania",
    comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Angol", "Pucon"]
  },
  {
    nombre: "Region de Los Rios",
    comunas: ["Valdivia", "La Union", "Panguipulli", "Rio Bueno", "Lanco"]
  },
  {
    nombre: "Region de Los Lagos",
    comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"]
  },
  {
    nombre: "Region de Aysen",
    comunas: ["Coyhaique", "Puerto Aysen", "Chile Chico", "Cochrane"]
  },
  {
    nombre: "Region de Magallanes",
    comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"]
  }
];

export function comunasDe(nombreRegion) {
  const region = regiones.find((r) => r.nombre === nombreRegion);
  return region ? region.comunas : [];
}
