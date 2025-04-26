'use client';

import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { FC, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

import Loader from '@/components/Loader';
import QuestionPage from '@/components/QuestionPage';
import TestNavBar from '@/components/TestNavBar';
import { CandidateContext } from '@/contexts/CandidateContext';
import useQuestion from '@/hooks/useQuestion';
import { ErrorResponse } from '@/types';

const Question: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { candidateDetails } = useContext(CandidateContext);
  const { question, isLoading, isError, error } = useQuestion(id as string);

  useEffect(() => {
    if(isError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const message = axiosError?.response?.data?.message || axiosError?.message || 'Something went wrong';
      toast.error(message);
    }
  }, [isError, error, candidateDetails]);

  return (
    <div className='w-screen h-screen bg-[#f3f6f7] overflow-y-scroll overflow-x-hidden'>
      <TestNavBar />
      {isLoading && <Loader />}

      <div className='pt-16 text-[#3d434b] font-poppins'>
        {question && question[0] && (
            <QuestionPage
              questionNumber={question[0].questionNumber}
              questionTitle={question[0].problemTitle}
              questionStatement={question[0].problemStatement}
              options={question[0].options}
              codeStubs={question[0].codeStubs}
              marks={question[0].marks}
            />
        )}
      </div>
    </div>
  );
};

export default Question;
