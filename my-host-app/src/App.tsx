// src/App.jsx
import React, { useEffect, useRef } from 'react';
import { https, setMethod1Callback } from './interceptor-library/index';

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
    const webComponent = document.querySelector('risk-mfe') as any;

    
    if (webComponent) {
      customElements.whenDefined('risk-mfe').then(() => {
       
        const method1 = webComponent.method1
        
       setMethod1Callback(method1);

        https
          .get('http://localhost:3000/api/error-417')
          .then((response: any) => {
            // console.log('API response:', response);
          })
          .catch((error: any) => {
          });
      });
    }
  }, []);

  return (
    <div>
      <h1>Aplicação React com Risk Engine MFE</h1>
      <risk-mfe ref={webComponentRef}></risk-mfe>
    </div>
  );
}

export default App;