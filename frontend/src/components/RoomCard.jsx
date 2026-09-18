import { useState } from "react";

import { apiFetch } from "../api";

import "./RoomCard.css";


function tempoRelativo(dataISO) {
  if (!dataISO) {
    return "agora";
  }

  const diff = Date.now() - new Date(dataISO).getTime();

  const minutos = Math.floor(diff / 60000);

  if (minutos < 1) {
    return "agora";
  }

  if (minutos < 60) {
    return `há ${minutos} min`;
  }

  const horas = Math.floor(minutos / 60);

  if (horas < 24) {
    return `há ${horas} h`;
  }

  const dias = Math.floor(horas / 24);

  return `há ${dias} d`;
}


function RoomCard({
  room,
  icon,
  currentUserId,
  onJoin,
  onLeave,
  onAfterDelete,
  processando
}) {
  const jogadores = room.jogadores || [];

  const souMembro = jogadores.some(
    (jogador) => (jogador._id || jogador) === currentUserId
  );

  const criadorId = room.criador?._id || room.criador;

  const souCriador = String(criadorId) === String(currentUserId);

  const cheia = jogadores.length >= room.maxJogadores;

  const [apagando, setApagando] = useState(false);

  const excluirSala = async () => {
    if (apagando) {
      return;
    }

    const confirmou = window.confirm(
      `Apagar a sala "${room.nome}"?`
    );

    if (!confirmou) {
      return;
    }

    setApagando(true);

    try {
      await apiFetch(`/rooms/${room._id}`, {
        method: "DELETE"
      });

      if (typeof onAfterDelete === "function") {
        onAfterDelete(room);
      }
    } catch (e) {
      window.alert(e.message || "Não foi possível apagar a sala.");
    } finally {
      setApagando(false);
    }
  };

  return (
    <div className="room-card">

      {souCriador && (

        <button
          className="room-delete-button"
          type="button"
          title="Apagar sala"
          disabled={apagando}
          onClick={excluirSala}
        >
          {apagando ? "..." : "🗑"}
        </button>

      )}

      <div className="room-profile">

        <div className="profile-photo">

          {room.criador?.foto ? (

            <img
              src={room.criador.foto}
              alt={room.criador.nome}
            />

          ) : (

            <span>
              👤
            </span>

          )}

        </div>


        <div className="room-details">

          <h2>
            {room.nome}
          </h2>


          <div className="room-tags">

            {room.elo && (

              <span className="rank-tag">
                🏆 {room.elo}
              </span>

            )}


            {room.modo && (

              <span className="mode-tag">

                {icon && (
                  <img
                    src={icon}
                    alt=""
                  />
                )}

                {room.modo}

              </span>

            )}

          </div>


          {room.genero && (

            <div className="gender-options">

              {room.genero.toUpperCase().includes("HOMEM") && (
                <span className="male">♂</span>
              )}

              {room.genero.toUpperCase().includes("MULHER") && (
                <span className="female">♀</span>
              )}

            </div>

          )}


          {room.descricao && (
            <p>
              {room.descricao}
            </p>
          )}

        </div>

      </div>


      <div className="room-members">

        <strong>
          {jogadores.length}/{room.maxJogadores}
        </strong>

        <span>
          Criado {tempoRelativo(room.createdAt)}
        </span>

      </div>


      <button
        className="join-button"
        type="button"
        disabled={processando || (!souMembro && cheia)}
        onClick={() =>
          souMembro
            ? onLeave?.(room)
            : onJoin?.(room)
        }
      >
        {processando
          ? "..."
          : souMembro
            ? "SAIR DA SALA"
            : cheia
              ? "SALA CHEIA"
              : "ENTRA NA SALA"
        }
      </button>

    </div>
  );
}

export default RoomCard;
