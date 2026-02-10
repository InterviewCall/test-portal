'use client';

import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import { IoTimerOutline } from 'react-icons/io5';

import { MAX_DURATION_MS_ADVANCED, MAX_DURATION_MS_INTERMEDIATE } from '@/constants';
import { AnswerContext } from '@/contexts/AnswerContext';
import { CandidateContext } from '@/contexts/CandidateContext';
import { TEST_STATUS } from '@/enums/TestStatus';
import { ErrorResponse } from '@/types';
import calculateTotalScore from '@/utils/calculateTotalScore';

import Logo from '../../public/images/logo.png';

interface NavBarProps {
  problemLevel?: string
}

const TestNavBar: FC<NavBarProps> = ({ problemLevel }) => {
  const [diff, setDiff] = useState(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const { answers } = useContext(AnswerContext);
  const { candidateDetails, setCandidate, setLoader } = useContext(CandidateContext);
  const router = useRouter();

  async function calculateScore() {
    try {
      setLoader('loading');
      const candidate = await calculateTotalScore(candidateDetails, answers);
      setLoader('success');
      setTimeout(() => {
        setLoader('hidden');
        toast.success('Successfully submitted your test');
        setCandidate(candidate);
      }, 1500);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const message = axiosError?.response?.data?.message || 'Something went wrong';
      toast.error(message);
      router.replace('/');
    }
  }

  useEffect(() => {
    if(!candidateDetails) {
      router.replace('/');
      return;
    }
    else if(candidateDetails.testStatus == TEST_STATUS.EXPIRED) {
      router.replace('/expired');
      return;
    }
    else if(candidateDetails.testStatus == TEST_STATUS.SUBMITTED) {
      router.replace('/feedback');
      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } ,[candidateDetails]);

  useEffect(() => {
    if(!candidateDetails) {
      router.replace('/');
      return;
    }

    const now = new Date();

    if((new Date(candidateDetails.startTime) > now)) {
      router.replace('/not-started');
      return;
    }

    const end = candidateDetails?.endTime ? new Date(candidateDetails.endTime) : null;

    if(!end) return;

    const storedStart = sessionStorage.getItem('testStartTime');
    let startTime: Date;

    if(storedStart) {
      startTime = new Date(storedStart);
    } else {
      startTime = now;
      sessionStorage.setItem('testStartTime', startTime.toISOString());
    }

    const remainingMs = end.getTime() - startTime.getTime();
    if(remainingMs <= 0) {
      setDiff(0);
      if(candidateDetails.testStatus == TEST_STATUS.SUBMITTED) {
        router.push('/feedback');
      }
      router.push('/expired');
      return;
    }

    const target = new Date(startTime.getTime() + Math.min(candidateDetails.problemLevel == 'Intermediate' ? MAX_DURATION_MS_INTERMEDIATE : MAX_DURATION_MS_ADVANCED, remainingMs));
    const initialDiff = target.getTime() - now.getTime();
    setDiff(initialDiff);

    intervalId.current = setInterval(() => {
      const current = new Date();
      const newDiff = target.getTime() - current.getTime();

      if(newDiff <= 0) {
        clearInterval(intervalId.current!);
        setDiff(0);
        if(candidateDetails.testStatus != TEST_STATUS.SUBMITTED) calculateScore();
      } else {
        setDiff(newDiff);
      }
    }, 1000);

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateDetails]);

  if (!candidateDetails) {
    return null;
  }

  const fullName = candidateDetails.candidateName;
  const splittedName = fullName.split(' ');
  const shortFirstName = splittedName[0].charAt(0);
  const shortLastName = splittedName[1] ? splittedName[1].charAt(0) : '';
  const shortName = shortFirstName + ' ' + shortLastName;
  const answerLength = Object.keys(answers).length;

  function logOut() {
    sessionStorage.clear();
    router.push('/');
  }

  const getMinutes = () => {
    const minutesInMs = diff % (1000 * 60 * 60);
    return String(Math.floor(minutesInMs / (1000 * 60))).padStart(2, '0');
  };
  const getSeconds = () => {
    const secondsInMs = diff % (1000 * 60);
    return String(Math.floor(secondsInMs / 1000)).padStart(2, '0');
  };

  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-base-200 shadow-sm px-6 py-3 flex items-center justify-between  font-poppins'>
      {/* Left Section: Logo & Title */}
      <div className='flex items-center gap-x-7'>
        <Image
            src={Logo}
            alt='Logo'
            width={40}
            height={40}
        />
        <span className='font-semibold md:text-lg text-xs md:inline hidden'>
          InterviewCall Entrance Test
        </span>

      </div>

      {/* Right Section: Status, Timer, Icons, Profile */}
      <div className='flex items-center gap-6 text-base'>
        <div className='font-medium text-xs'>
          <span className='hidden md:inline text-lg'>Answered:</span> <span className='md:hidden text-sm'>Ans:</span> <span className='font-bold text-sm md:text-lg'>{`${answerLength} / ${problemLevel ? problemLevel == 'Intermediate' ? '22' : '12' : '22'}`}</span>
        </div>

        <div className='flex items-center gap-1'>
          <IoTimerOutline className='md:text-lg' />
          <span className='font-semibold text-sm md:text-lg'>{getMinutes()} : {getSeconds()}</span>
        </div>

        {/* <FaMoon className='text-lg cursor-pointer' /> */}
        <FaUserCircle className='text-xl' />

        <details className='dropdown dropdown-end'>
          <summary className='m-0 cursor-pointer font-medium max-md:text-sm md:text-lg'>{shortName}</summary>
          <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40'>
            {/* <li>
              <a>Profile</a>
            </li> */}
            <li className='cursor-pointer' onClick={logOut}>
              <a>Logout</a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default TestNavBar;
