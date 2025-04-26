'use client';

import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';

import { CandidateContext } from '@/contexts/CandidateContext';
import { TEST_STATUS } from '@/enums/TestStatus';

const Expired: FC = () => {
  const router = useRouter();
  const { candidateDetails } = useContext(CandidateContext);
  useEffect(() => {
    if(!candidateDetails) {
        router.replace('/');
        return;
    } else if(candidateDetails.testStatus == TEST_STATUS.SUBMITTED || candidateDetails.testStatus == TEST_STATUS.INVITED || candidateDetails.testStatus == TEST_STATUS.IN_PROGRESS) {
        router.back();
        return;
    }

    if((new Date(candidateDetails.dateOfTest) > new Date()) || (new Date(candidateDetails.startTime) > new Date())) {
        router.replace('/not-started');
        return;
    }

    setTimeout(() => {
        logOut();
    }, 5000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[router]);

  function logOut() {
    router.push('/');
    sessionStorage.clear();
  }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4'>
      <div className='bg-white shadow-md rounded-2xl p-8 max-w-md text-center border border-red-200'>
        <div className='flex justify-center mb-4 text-red-500 text-5xl'>
          <FiClock />
        </div>
        <h1 className='text-2xl font-semibold text-gray-800 mb-2'>
          This link has expired
        </h1>
        <p className='text-gray-600 mb-6'>
          Your test link is no longer valid. Please contact support if you think
          this is a mistake.
        </p>
        <button
          onClick={logOut}
          className='px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer'
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Expired;
