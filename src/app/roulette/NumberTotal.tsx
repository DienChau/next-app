// NumeroObtenido.tsx
import React from 'react';

interface NumeroObtenidoProps {
  number: number;
}

const NumeroObtenido: React.FC<NumeroObtenidoProps> = ({ number }) => {
  return <div className="numero-obtenido">{number}</div>;
};

export default NumeroObtenido;
