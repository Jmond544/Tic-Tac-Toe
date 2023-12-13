import "../Styles/WinState.css";

function WinState({ win, count }) {
  return (
    <h2
      className={`subtitle ${
        win === "X"
          ? "showX"
          : win === "O"
          ? "showO"
          : count === 9
          ? "showE"
          : "playing"
      }`}
    >
      {win != "" ? `Ganador: ${win}` : count === 9 ? "Empate" : "Jugando..."}
    </h2>
  );
}

export default WinState;
