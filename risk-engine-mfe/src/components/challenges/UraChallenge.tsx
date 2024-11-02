// src/components/URAChallenge.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const URAChallenge: React.FC= () => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const pollEndpoint = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/check-authentication');
        console.log('Polling response:', response.data);

        if (response.data.authenticatedByUser === true) {
          setAuthenticated(true);
          clearInterval(intervalId);
          window.dispatchEvent(new CustomEvent('user-authenticated', { detail: { authenticated: true } }));
        }
      } catch (error) {
        console.error('Error polling endpoint:', error);
      }
    };

    if (!authenticated) {
      // Start polling every 2 seconds
      intervalId = setInterval(pollEndpoint, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [authenticated]);


  return (
    <>
      <h2>URA Challenge</h2>
      <p>Envie o usuário à URA</p>
      { authenticated && (<div>Cliente autenticado!</div>)}
      </>
  );
};

export default URAChallenge;