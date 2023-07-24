// Score.tsx
import React from 'react';

interface ScoreProps {
  maxScore: number;
}

const Score: React.FC<ScoreProps> = ({ maxScore }) => {
  return (
    <section className="score">
      <p title="Mientras más bolas queden en el bolillero cuando ganas, significa que lograste una win en menos intentos, eso determina tu puntaje">
        Puntaje máximo <span id="score">{maxScore}</span> puntos
      </p>
    </section>
  );
};

export default Score;
