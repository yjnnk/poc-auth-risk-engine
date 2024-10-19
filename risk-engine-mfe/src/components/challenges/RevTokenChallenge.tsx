// src/components/challenges/RevTokenChallenge.tsx
import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import { pollTokenStatus } from '../../services/apiService';
import { startPolling } from '../../utils/polling';

const RevTokenChallenge: React.FC = () => {
  const [token] = useState(() => Math.floor(Math.random() * 1000000));
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const { stop } = startPolling(async () => {
      const status = await pollTokenStatus(token);
      if (status === true) {
        setVerified(true);
        // Dispatch a custom event to notify the host application
        const event = new CustomEvent('verification-complete', {
          detail: { token },
          bubbles: true,
          composed: true,
        });
        window.dispatchEvent(event);
        return false; // Stop polling
      }
      return true; // Continue polling
    }, 5000);

    return () => {
      stop();
    };
  }, [token]);

  return (
    <Modal>
      {verified ? (
        <p>Verification successful!</p>
      ) : (
        <div>
          <p>Your verification token is: {token}</p>
          <p>Please complete the required action.</p>
        </div>
      )}
    </Modal>
  );
};

export default RevTokenChallenge;