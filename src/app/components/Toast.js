import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`notification is-${type}`}
      style={{
        position: "fixed",
        top: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        minWidth: 220,
        maxWidth: 400,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        animation: "toast-in 0.4s cubic-bezier(.4,2,.6,1)"
      }}
    >
      <button className="delete" onClick={onClose}></button>
      {message}
      <style jsx>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(-30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
} 