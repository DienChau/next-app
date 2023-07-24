// PlayerBoard.tsx
import React from 'react';

interface PlayerBoardProps {
  userNumbers: number[];
  drawnNumbersSet: Set<number>; // Sửa drawnNumbers thành drawnNumbersSet
}

const PlayerBoard: React.FC<PlayerBoardProps> = ({ userNumbers, drawnNumbersSet }) => {
  return (
    <div className="carton">
      <h2>Player</h2>
      <div className="carton__numero-contenedor" id="playerBoard">
        {userNumbers.map((number, index) => (
          <div
            key={index}
            className={`numero-contenedor__child ${
              drawnNumbersSet.has(number) ? 'player-drawn' : ''
            }`}
            id={`userNum${index}`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerBoard;
