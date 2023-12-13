import "../Styles/TicTacToe.css";
import { useState, useEffect, useRef } from "react";
import Quadrant from "./Quadrant";
import WinState from "./WinState";
import Switch from "./Switch";

function TikTakToe() {
  const [count, setCount] = useState(0);
  const lock = useRef(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [win, setWin] = useState("");

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

  const playerAuto = () => {
    if (count % 2 === 0 || lock.current) {
      return;
    }
    const random = Math.floor(Math.random() * 9);
    if (board[random] === null) {
      toggle(random);
    } else {
      playerAuto();
    }
  };

  useEffect(() => {
    verificarGanador();

    setTimeout(() => {
      playerAuto();
    }, 200);
  }, [count]);

  return (
    <div>
      <div className="container">
        <h1 className="title">
          <span>TicTacToe</span> Game
        </h1>
        <div className="state-bar">
          <WinState win={win} count={count} />
          <Switch />
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
