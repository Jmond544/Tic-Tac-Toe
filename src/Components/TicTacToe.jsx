import "../Styles/TicTacToe.css";
import { useState, useEffect } from "react";
import Quadrant from "./Quadrant";
import WinState from "./WinState";

function TikTakToe() {
  const [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [win, setWin] = useState("");

  const toggle = (num) => {
    if (lock || board[num] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[num] = count % 2 === 0 ? "X" : "O";
    setBoard(newBoard);
    setCount(count + 1);
  };

  const resetBoard = () => {
    setLock(false);
    setBoard(Array(9).fill(null));
    setCount(0);
    setWin("");
  };

  const verificarGanador = () => {
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

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];

      if (board[a] === "X" && board[b] === "X" && board[c] === "X") {
        setWin("X");
        setLock(true);
        return winConditions[i];
      } else if (board[a] === "O" && board[b] === "O" && board[c] === "O") {
        setWin("O");
        setLock(true);
        return winConditions[i];
      }
    }
    console.log("Ganador: ", win);
    return null;
  };

  useEffect(() => {
    verificarGanador();
  }, [board]);

  return (
    <div>
      <div className="container">
        <h1 className="title">
          TicTacToe Game with <span>React</span>
        </h1>
        <WinState win={win} count={count} />
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
