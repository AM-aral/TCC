import { useCallback, useEffect, useState } from "react";

import { apiFetch } from "../api";

export function useRooms(game) {
  const [salas, setSalas] = useState([]);

  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState("");

  const [versao, setVersao] = useState(0);


  useEffect(() => {

    if (!game) {
      return undefined;
    }

    let ativo = true;

    const buscar = async () => {

      try {

        const dados = await apiFetch(
          `/rooms?jogo=${encodeURIComponent(game)}`
        );

        if (!ativo) {
          return;
        }

        setSalas(dados);

        setErro("");

      } catch (e) {

        if (!ativo) {
          return;
        }

        setErro(
          e.message || "Não foi possível carregar as salas."
        );

      } finally {

        if (ativo) {
          setCarregando(false);
        }

      }

    };

    buscar();

    return () => {
      ativo = false;
    };

  }, [game, versao]);


  const recarregar = useCallback(() => {

    setCarregando(true);

    setVersao((v) => v + 1);

  }, []);


  return {
    salas,
    carregando,
    erro,
    recarregar
  };
}
