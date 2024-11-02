// src/App.jsx
import { useEffect } from 'react';

import { http } from './https';



function App() {


  const callMe = () => {
      http
      .get('/api/some-bff', {
        headers: {
          "x-custom-header": "true"
        }
      })
      .then((response: any) => {
        console.log('API response:', response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  // useEffect(() => {
  //     http
  //     .get('/api/some-bff')
  //     .then((response: any) => {
  //       console.log('API response:', response);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });

  // }, []);

  return (
    <div>
      <h1>Aplicação React com Risk Engine MFE</h1>
      <button onClick={callMe}> dipstach</button>
    </div>
  );
}

export default App;