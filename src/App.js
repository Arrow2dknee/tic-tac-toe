import { useState } from 'react';

function Square({ index, value, onClick }) {
  function handleClick() {
    onClick(index);
  }
  return <button className="square" onClick={handleClick}>{value}</button>
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');

  function onButtonClick(position) {
    squares[position] = turn;
    setSquares(squares);
    if (turn === 'X') {
      setTurn('O');
    } else if (turn === 'O') {
      setTurn('X');
    }
  }

  return (<>
    <p>Who's turn is it now: <span>{turn}</span></p>
    <div className="board-row">
      <Square index={'0'} value={squares[0]} onClick={onButtonClick}/>
      <Square index={'1'} value={squares[1]} onClick={onButtonClick}/>
      <Square index={'2'} value={squares[2]} onClick={onButtonClick}/>
    </div>
    <div className="board-row">
      <Square index={'3'} value={squares[3]} onClick={onButtonClick}/>
      <Square index={'4'} value={squares[4]} onClick={onButtonClick}/>
      <Square index={'5'} value={squares[5]} onClick={onButtonClick}/>
    </div>
    <div className="board-row">
      <Square index={'6'} value={squares[6]} onClick={onButtonClick}/>
      <Square index={'7'} value={squares[7]} onClick={onButtonClick}/>
      <Square index={'8'} value={squares[8]} onClick={onButtonClick}/>
    </div>
    </>);
}
