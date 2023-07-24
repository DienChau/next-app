// CpuBoard.tsx
import React from 'react';

interface CpuBoardProps {
  cpuNumbers: number[];
  drawnNumbersSet: Set<number>; // Sửa drawnNumbers thành drawnNumbersSet
}

const CpuBoard: React.FC<CpuBoardProps> = ({ cpuNumbers, drawnNumbersSet }) => {
  return (
    <div className="carton">
      <h2>CPU</h2>
      <div className="carton__numero-contenedor" id="cpuBoard">
        {cpuNumbers.map((number, index) => (
          <div
            key={index}
            className={`numero-contenedor__child ${
              drawnNumbersSet.has(number) ? 'cpu-drawn' : ''
            }`}
            id={`cpuNum${index}`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CpuBoard;
