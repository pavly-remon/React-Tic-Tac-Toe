const GameOver = ({ winner, onRestart }) => {
    return (
      <div id="game-over">
        <h2>Game Over</h2>
        <p>{winner} wins!</p>
        <button onClick={onRestart}>Play Again</button>
      </div>
    );
  };
  
  export default GameOver;
  