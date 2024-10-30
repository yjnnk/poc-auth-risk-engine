// src/App.jsx
import React, { useEffect, useRef, useState } from 'react';
import { HttpClientService } from './interceptor-library/index';
import axios from 'axios'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'risk-mfe': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

function App() {
  const webComponentRef = useRef(null);

  useEffect(() => {

    customElements.whenDefined('risk-mfe').then(() => {
      const webComponent = document.querySelector('risk-mfe') as any;

      const method1 = webComponent.method1

      const client = new HttpClientService({ axios, challengeCodeFromRiskEngine: method1 });

      const http = client.createHttpInstance({
        baseURL: "http://localhost:3000/"
      });

      http
      .get('/api/some-bff')
      .then((response: any) => {
        console.log('API response:', response);
      })
      .catch((error: any) => {
        console.log(error);
      });
    });
  }, []);

  return (
    <div>
      <h1>Aplicação React com Risk Engine MFE</h1>
      <risk-mfe ref={webComponentRef}></risk-mfe>
    </div>
  );
}

export default App;