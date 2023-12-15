import "../Styles/TicTacToe.css";
import { useState, useEffect, useRef } from "react";
import Quadrant from "./Quadrant";
import WinState from "./WinState";
import Switch from "./Switch";

const winConditions = [
  [0, 1, 2], // Horizontal
  [3, 4, 5], // Horizontal
  [6, 7, 8], // Horizontal
  [0, 3, 6], // Vertical
  [1, 4, 7], // Vertical
  [2, 5, 8], // Vertical
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

function TikTakToe() {
  const [count, setCount] = useState(0);
  const lock = useRef(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [win, setWin] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const toggle = (num) => {
    if (lock.current || board[num] !== null) {
      return;
    }
    const newBoard = [...board];
    newBoard[num] = count % 2 === 0 ? "X" : "O";
    setBoard(newBoard);
    setCount(count + 1);
  };

  const resetBoard = () => {
    lock.current = false;
    setBoard(Array(9).fill(null));
    setCount(0);
    setWin("");
  };

  const verificarGanador = () => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];

      if (board[a] === "X" && board[b] === "X" && board[c] === "X") {
        setWin("X");
        lock.current = true;
        return winConditions[i];
      } else if (board[a] === "O" && board[b] === "O" && board[c] === "O") {
        setWin("O");
        lock.current = true;
        return winConditions[i];
      }
    }

    if (count === 9) {
      lock.current = true;
      return;
    }

    return null;
  };
  // Función para verificar si se puede ganar en el siguiente movimiento
  const canWinNextMove = (player) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] === player && board[b] === player && board[c] === null) {
        return c;
      } else if (
        board[a] === player &&
        board[c] === player &&
        board[b] === null
      ) {
        return b;
      } else if (
        board[b] === player &&
        board[c] === player &&
        board[a] === null
      ) {
        return a;
      }
    }
    return null;
  };
  const playerAuto = () => {
    if (count % 2 === 0 || lock.current) {
      return;
    }

    if (count === 1) {
      // Reglas para el primer movimiento del jugador automático
      const corners = [0, 2, 6, 8];
      const center = 4;

      if (board[center] === "X") {
        // Si el oponente empieza en el centro, ocupa una esquina
        toggle(corners[Math.floor(Math.random() * corners.length)]);
        return;
      } else {
        // Si el oponente empieza en una esquina, juega en el centro
        toggle(center);
        return;
      }
    }

    const winMove = canWinNextMove("O"); // Verificar si el jugador automático puede ganar en el siguiente movimiento
    const blockMove = canWinNextMove("X"); // Verificar si el oponente puede ganar en el siguiente movimiento y bloquearlo

    if (winMove !== null) {
      toggle(winMove);
    } else if (blockMove !== null) {
      toggle(blockMove);
    } else {
      const random = Math.floor(Math.random() * 9);
      if (board[random] === null) {
        toggle(random);
      } else {
        playerAuto();
      }
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    verificarGanador();
    if (isChecked) {
      setTimeout(() => {
        playerAuto();
      }, 200);
    }
  }, [count]);

  return (
    <div>
      <div className="container">
        <h1 className="title">
          <span>TicTacToe</span> Game
        </h1>
        <div className="state-bar">
          <div className={`container-switch ${isChecked? 'checked':'' }`}>
            <p>Jugar con IA: </p>
            <Switch
              isChecked={isChecked}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <WinState win={win} count={count} />
        </div>
        <div className="board">
          {board.map((value, index) => (
            <Quadrant key={index} value={value} index={index} toggle={toggle} />
          ))}
        </div>
        <button className="reset" onClick={resetBoard}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default TikTakToe;
