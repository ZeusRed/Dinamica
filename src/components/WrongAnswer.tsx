import React, { useEffect } from "react";
import tache from "../assets/images/tache.gif";

interface WrongAnswerOverlayProps {
  visible: boolean;
  duration?: number; 
  onFinish?: () => void;
}

const WrongAnswerOverlay: React.FC<WrongAnswerOverlayProps> = ({
  visible,
  duration = 2000,
  onFinish,
}) => {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onFinish?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onFinish]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <img
        src={tache}
        alt="Respuesta incorrecta"
        style={{
          width: "80vw",
          height: "80vh",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default WrongAnswerOverlay;
