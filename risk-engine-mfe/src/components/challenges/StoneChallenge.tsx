// src/components/challenges/StoneChallenge.tsx
import React from 'react';
import Modal from '../Modal';

const StoneChallenge: React.FC = () => {
  return (
    <Modal>
      <p>Stone</p>
      <a
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Vá ao site
      </a>
    </Modal>
  );
};

export default StoneChallenge;