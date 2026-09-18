export function normalizar(valor) {
  return String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}

export function salaPassaFiltros(sala, filtros) {
  if (filtros.genero) {
    const genero = normalizar(sala.genero);

    if (!genero.includes(normalizar(filtros.genero))) {
      return false;
    }
  }

  if (filtros.modo) {
    if (normalizar(sala.modo) !== normalizar(filtros.modo)) {
      return false;
    }
  }

  if (filtros.elo) {
    if (normalizar(sala.elo) !== normalizar(filtros.elo)) {
      return false;
    }
  }

  if (filtros.jogadores) {
    const quantidade = (sala.jogadores || []).length;

    if (quantidade !== Number(filtros.jogadores)) {
      return false;
    }
  }

  return true;
}
