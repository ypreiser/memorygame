import React from 'react';

const GameFinishedModal = ({ onClose, time, turns, score }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>Time: {time} seconds</p>
        <p>Turns: {turns}</p>
        <div className='score'>
          Score: <br /> Player 1 - {score.player1} <br /> Player 2 - {score.player2}
        </div>
        <button className="newGame" onClick={onClose}>New Game</button>
      </div>
    </div>
  );
};

export default GameFinishedModal;
