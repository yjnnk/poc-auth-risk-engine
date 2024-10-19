// src/App.tsx
import { forwardRef, useImperativeHandle, useState } from 'react';
import ModalManager from './components/ModalManager';

export interface AppRef {
  updateBody: (newBody: any) => void;
}

const App = forwardRef<AppRef>((_, ref) => {
  const [challengeCode, setChallengeCode] = useState<string | null>(null);

  console.log('app');
  useImperativeHandle(ref, () => ({
    updateBody(newBody: any) {
      console.log('App comp');
      console.log(newBody);
      setChallengeCode(newBody.challenge);
    },
  }));

  return (
    <div>
      {challengeCode && <ModalManager code={challengeCode} />}
    </div>
  );
});

export default App;