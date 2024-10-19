import { Suspense, lazy } from 'react';

const StoneChallenge = lazy(() => import('../components/challenges/StoneChallenge'));
const RevTokenChallenge = lazy(() => import('../components/challenges/RevTokenChallenge'));


interface ModalManagerProps {
  code: string;
}

const ModalManager: React.FC<ModalManagerProps> = ({ code }) => {
  let ChallengeComponent;

  switch (code) {
    case 'STONE':
      ChallengeComponent = StoneChallenge;
      break;
    case 'REV_TOKEN':
      ChallengeComponent = RevTokenChallenge;
      break;
    default:
      return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChallengeComponent />
    </Suspense>
  );
};

export default ModalManager;