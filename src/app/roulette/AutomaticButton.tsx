// AutomaticButton.tsx
import React from 'react';

interface AutomaticButtonProps {
  onAutomatic: () => void;
  onStopAutomatic: () => void;
  isAutomatic: boolean;
}

const AutomaticButton: React.FC<AutomaticButtonProps> = ({
  onAutomatic,
  onStopAutomatic,
  isAutomatic,
}) => {
  return (
    <section className="jugada-automatica" id="autoPlay">
      <button className="aut-btn" id="automatica" onClick={onAutomatic}>
        Jugada Automática
      </button>
      <button className={`aut-btn ${isAutomatic ? 'hidden' : ''}`} id="stopAutomatica" onClick={onStopAutomatic}>
        Parar
      </button>
    </section>
  );
};

export default AutomaticButton;
