export function leer(clave, valorInicial) {
  const datos = localStorage.getItem(clave);
  if (datos === null) {
    guardar(clave, valorInicial);
    return copiar(valorInicial);
  }
  return JSON.parse(datos);
}

export function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

export function borrar(clave) {
  localStorage.removeItem(clave);
}

export function siguienteId(lista, campo = "id") {
  let mayor = 0;
  lista.forEach((elemento) => {
    if (elemento[campo] > mayor) {
      mayor = elemento[campo];
    }
  });
  return mayor + 1;
}

function copiar(valor) {
  return JSON.parse(JSON.stringify(valor));
}
