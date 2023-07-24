// src/components/NumberContainer.tsx
import React from 'react';

interface NumberContainerProps {
  numbers: number[];
  renderNumberColor: (number: number) => string;
}

const NumberContainer: React.FC<NumberContainerProps> = ({ numbers, renderNumberColor }) => {
  return (
    <section className="numeros">
      {numbers.map((number) => (
        <div key={number} className="numero-obtenido" style={{ backgroundColor: renderNumberColor(number) }}>
          {number}
        </div>
      ))}
    </section>
  );
};

export default NumberContainer;
