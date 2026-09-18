import { useEffect, useRef, useState } from "react";

import { apiFetch, getUsuario } from "../api";

// ======================================================
// BUSCA DE JOGADORES
// Renderiza um campo de busca com sugestões.
// ======================================================

export default function BuscarJogador({
  onSelecionar,
  placeholder = "Buscar jogadores por nome ou @apelido..."
}) {

  const [termo, setTermo] = useState("");

  const [resultados, setResultados] = useState([]);

  const [buscando, setBuscando] = useState(false);

  const [aberto, setAberto] = useState(false);

  const [erro, setErro] = useState("");

  const caixaRef = useRef(null);

  const usuario = getUsuario();

  const meuId = usuario?.id || "";

  // =====================================================
  // FECHAR AO CLICAR FORA
  // =====================================================

  useEffect(() => {
    const aoClicarFora = (evento) => {
      if (
        caixaRef.current &&
        !caixaRef.current.contains(evento.target)
      ) {
        setAberto(false);
      }
    };

    document.addEventListener("mousedown", aoClicarFora);

    return () =>
      document.removeEventListener("mousedown", aoClicarFora);
  }, []);

  // =====================================================
  // BUSCAR (COM DEBOUNCE)
  // =====================================================

  useEffect(() => {
    const texto = termo.trim();

    if (texto.length < 2) {
      setResultados([]);

      setAberto(false);

      setErro("");

      return undefined;
    }

    let ativo = true;

    const timeout = setTimeout(async () => {
      setBuscando(true);

      try {
        const lista = await apiFetch(
          `/usuarios?q=${encodeURIComponent(texto)}`
        );

        if (ativo) {
          const semEu = (lista || []).filter(
            (item) => String(item._id) !== String(meuId)
          );

          setResultados(semEu);

          setAberto(true);

          setErro("");
        }
      } catch (e) {
        if (ativo) {
          setResultados([]);

          setErro(e.message || "Não foi possível buscar.");
        }
      } finally {
        if (ativo) {
          setBuscando(false);
        }
      }
    }, 350);

    return () => {
      ativo = false;

      clearTimeout(timeout);
    };
  }, [termo, meuId]);

  // =====================================================
  // SELECIONAR
  // =====================================================

  const selecionar = (jogador) => {
    setAberto(false);

    setTermo("");

    setResultados([]);

    if (typeof onSelecionar === "function") {
      onSelecionar(jogador);
    }
  };

  const apelidoDe = (item) =>
    item.apelido
      ? `@${item.apelido}`
      : `@${(item.email || "jogador").split("@")[0]}`;

  return (
    <div
      className="buscar"
      ref={caixaRef}
    >

      <div className="buscar-caixa">

        <span className="buscar-lupa">⌕</span>

        <input
          type="text"
          value={termo}
          placeholder={placeholder}
          onChange={(evento) => {
            setTermo(evento.target.value);

            setErro("");
          }}
          onFocus={() => {
            if (resultados.length > 0) {
              setAberto(true);
            }
          }}
        />

        {buscando && (

          <span className="buscar-status">
            ...
          </span>

        )}

      </div>

      {erro && (

        <p className="buscar-erro">
          {erro}
        </p>

      )}

      {aberto && termo.trim().length >= 2 && !buscando && (

        <div className="buscar-dropdown">

          {resultados.length === 0 && !erro && (

            <div className="buscar-sem-resultado">
              Nenhum jogador encontrado.
            </div>

          )}

          {resultados.map((item) => (

            <button
              type="button"
              key={item._id}
              className="buscar-item"
              onClick={() => selecionar(item)}
            >

              <span className="buscar-avatar">
                {item.foto ? (

                  <img
                    src={item.foto}
                    alt={item.nome}
                  />

                ) : (

                  String(item.nome || "?").charAt(0).toUpperCase()

                )}
              </span>

              <span className="buscar-nome">

                <strong>
                  {item.nome}
                </strong>

                <small>
                  {apelidoDe(item)}
                </small>

              </span>

            </button>

          ))}

        </div>

      )}

    </div>
  );
}