// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '1rem',
    zIndex: 1000,
    border: '1px solid #ccc',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 999,
  };

  return (
    <>
      <div style={overlayStyle}></div>
      <div style={modalStyle}>{children}</div>
    </>
  );
};

export default Modal;