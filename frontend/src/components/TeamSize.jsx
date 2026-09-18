import "./TeamSize.css";

function TeamSize({ opcoes, valor, onChange }) {
  return (
    <div className="team-size">

      {opcoes.map((opcao) => (

        <button
          key={opcao}
          type="button"
          className={
            `team-button ${valor === opcao ? "selected" : ""}`
          }
          onClick={() => onChange(opcao)}
        >

          {opcao}

        </button>

      ))}

    </div>
  );
}

export default TeamSize;
