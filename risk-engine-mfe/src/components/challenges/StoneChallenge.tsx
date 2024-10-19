// src/components/challenges/StoneChallenge.tsx
import React from 'react';
import Modal from '../Modal';

const StoneChallenge: React.FC = () => {
  return (
    <Modal>
      <p>Please visit the following link to proceed:</p>
      <a
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Verification
      </a>
    </Modal>
  );
};

export default StoneChallenge;