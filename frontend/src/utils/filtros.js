export function normalizar(valor) {
  return String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}

export function salaPassaFiltros(sala, filtros, busca = "") {
  const termo = normalizar(busca);

  if (termo) {
    const alvo = normalizar(
      [
        sala.nome,
        sala.descricao,
        sala.modalidade,
        sala.genero,
        sala.modo,
        sala.elo,
        sala.jogo,
        typeof sala.criador === "object" ? sala.criador?.nome : ""
      ].join(" ")
    );

    if (!alvo.includes(termo)) {
      return false;
    }
  }

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
