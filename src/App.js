import { useState, Fragment } from "react";

function Square({ index, value, onClick }) {
  function handleClick() {
    onClick(index);
  }
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

function Board({ turn, squares, onPlay }) {
  function onButtonClick(position) {
    if (squares[position] || calculateWinner(squares)) {
      return;
    }
    const updatedSquares = squares.slice(); // immutability
    updatedSquares[position] = turn;
    onPlay(updatedSquares);
  }

  const win = calculateWinner(squares);
  let status = "";
  if (win) {
    status = "Winner: " + win;
  } else {
    status = "Next player turn: " + turn;
  }

  return (
    <Fragment>
      <p>{status}</p>
      <div className="board-row">
        <Square index={"0"} value={squares[0]} onClick={onButtonClick} />
        <Square index={"1"} value={squares[1]} onClick={onButtonClick} />
        <Square index={"2"} value={squares[2]} onClick={onButtonClick} />
      </div>
      <div className="board-row">
        <Square index={"3"} value={squares[3]} onClick={onButtonClick} />
        <Square index={"4"} value={squares[4]} onClick={onButtonClick} />
        <Square index={"5"} value={squares[5]} onClick={onButtonClick} />
      </div>
      <div className="board-row">
        <Square index={"6"} value={squares[6]} onClick={onButtonClick} />
        <Square index={"7"} value={squares[7]} onClick={onButtonClick} />
        <Square index={"8"} value={squares[8]} onClick={onButtonClick} />
      </div>
    </Fragment>
  );
}

export default function Game() {
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[step];
  const turn = step % 2 === 0 ? "X" : "O";

  function handlePlay(updatedSquares) {
    const updatedHistory = [...history.slice(0, step + 1), updatedSquares];
    setHistory(updatedHistory);
    setStep(updatedHistory.length - 1);
  }

  function jumpTo(currentStep) {
    setStep(currentStep);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board turn={turn} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {history.map((squares, index) => {
            let description = "";
            if (index > 0) {
              description = "Go to move #" + index;
            } else {
              description = "Go to start of the game";
            }

            return (
              index !== history.length - 1 && (
                <li key={index}>
                  <button onClick={() => jumpTo(index)}>{description}</button>
                </li>
              )
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
