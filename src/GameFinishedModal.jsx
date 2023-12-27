import React from 'react';

const GameFinishedModal = ({ onClose, time, turns, score, gameMode, formatTime }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {gameMode === 'single' ? (
          <>
            <h1>Congratulations!</h1>
            <div className='timer'>Timer: {formatTime(time)}</div>
            <div className='turns'>Turns: {turns}</div>
          </>
        ) : (
          <>
           <div className='score'>
          Score: <br /> Player 1 - {score.player1} <br /> Player 2 - {score.player2}
        </div>
          </>
        )}
        <button className="newGame" onClick={onClose}>New Game</button>
      </div>
    </div>
  );
};

export default GameFinishedModal;
