// src/App.tsx
import { forwardRef, useImperativeHandle, useState } from 'react';
import ModalManager from './components/ModalManager';

export interface AppRef {
  selectChallenge: (newBody: any) => void;
}

const App = forwardRef<AppRef>((_, ref) => {
  const [challengeCode, setChallengeCode] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    selectChallenge(newBody: any) {
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