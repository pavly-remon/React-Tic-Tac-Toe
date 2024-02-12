import { useState } from "react";
import Player from "@/components/Player";
import GameBoard from "@/components/GameBoard";
import GameOver from "@/components/GameOver";
import Log from "@/components/Log";
import { WINNING_COMBINATIONS } from "./assets/winning-comb";

const PLAYERS = {
  "X": "Player 1",
  "O": "Player 2",
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (game) => {
  let currPlayer = "X";
  if (game.length !== 0 && game[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}
const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];
  for (const turn of gameTurns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  }
  return gameBoard; 
}
const deriveWinner = (gameBoard) => {
 for(const comb of WINNING_COMBINATIONS) {
   const [a, b, c] = comb;
   if(gameBoard[a.row][a.column]
    && gameBoard[a.row][a.column] === gameBoard[b.row][b.column]
    && gameBoard[a.row][a.column] === gameBoard[c.row][c.column]) {
     return gameBoard[a.row][a.column];
   }
 }
 return null;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = players[deriveWinner(gameBoard)];
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((curr) => {
      const currPlayer = deriveActivePlayer(curr);
      return [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...curr,
      ];
    });
  };
  const onRestart = () => {
   setGameTurns([]); 
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initalName={players["X"]} symbol="X" onChangeName={setPlayers} isActive={activePlayer === "X"} />
          <Player initalName={players["O"]} symbol="O" onChangeName={setPlayers} isActive={activePlayer === "O"} />
        </ol>
        {winner && <GameOver winner={winner} onRestart={onRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
