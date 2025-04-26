'use client';

import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect } from 'react';

import { CandidateContext } from '@/contexts/CandidateContext';
import { formatOnlyDate, formatTime } from '@/utils';

const TestNotStarted: FC = () => {
  const router = useRouter();
  const { candidateDetails } = useContext(CandidateContext);

  const handleGoBack = () => {
    router.replace('/');
    sessionStorage.clear();
  };

  useEffect(() => {
    if(!candidateDetails) {
        router.replace('/');
        return;
    }

    if((new Date(candidateDetails.dateOfTest) <= new Date()) && (new Date(candidateDetails.startTime) <= new Date())) {
        router.back();
        return;
    }

    setTimeout(() => {
        router.replace('/');
        sessionStorage.clear();
    }, 5000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateDetails]);

  if (!candidateDetails) return null;

  const formattedStartTime = `${formatOnlyDate(candidateDetails.dateOfTest)}, ${formatTime(candidateDetails.startTime)}`;
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-4'>
      <h1 className='text-2xl md:text-3xl font-semibold mb-4 text-error'>
        Test Has Not Started Yet
      </h1>
      <p className='text-lg md:text-xl mb-6'>
        Your scheduled test start time is:
        <br />
        <span className='font-bold text-primary'>{formattedStartTime}</span>
      </p>
      <button
        onClick={handleGoBack}
        className='px-6 py-2 rounded-md bg-primary text-white font-medium hover:bg-indigo-600 duration-300 transition cursor-pointer'
      >
        Go Back
      </button>
    </div>
  );
};

export default TestNotStarted;
