'use client';

import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

import Loader from '@/components/Loader';
import SubmitLoader from '@/components/SubmitLoader';
import TestNavBar from '@/components/TestNavBar';
import { CANDIDATE_API } from '@/constants';
import { AnswerContext } from '@/contexts/AnswerContext';
import { CandidateContext } from '@/contexts/CandidateContext';
import { TEST_STATUS } from '@/enums/TestStatus';
import useQuestions from '@/hooks/useQuestions';
import { ErrorResponse } from '@/types';
import calculateTotalScore from '@/utils/calculateTotalScore';

const QuestionsPage: FC = () => {
  const { answers } = useContext(AnswerContext);
  const { candidateDetails, setCandidateStatus, setLoader, setCandidate } = useContext(CandidateContext); 
  const { questions, isLoading, isError, error } = useQuestions();
  const router = useRouter();

  async function updateTestStatus() {
    try {
      await axios.patch(`${CANDIDATE_API}/update-test-status`, {
        email: candidateDetails?.candidateEmail,
        status: TEST_STATUS.IN_PROGRESS
      });
      setCandidateStatus(TEST_STATUS.IN_PROGRESS);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const message = axiosError?.response?.data?.message || axiosError?.message || 'Something went wrong';
      toast.error(message);
    }
  }

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
      const message = axiosError?.response?.data?.message || axiosError?.message || 'Something went wrong';
      toast.error(message);
      router.replace('/');
    }
  }

  useEffect(() => {
    if(!candidateDetails || candidateDetails?.testStatus == TEST_STATUS.SUBMITTED || candidateDetails?.testStatus == TEST_STATUS.EXPIRED) {
      router.back();
      return;
    }
    if(candidateDetails?.testStatus != TEST_STATUS.IN_PROGRESS) updateTestStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateDetails]);

  useEffect(() => {
    if(isError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const message = axiosError?.response?.data?.message || axiosError?.message || 'Something went wrong';
      toast.error(message);
    }
  }, [isError, error]);

  return (
    <div className='w-screen h-screen bg-[#f3f6f7] overflow-x-hidden'>
      <TestNavBar />
      <SubmitLoader />
      {isLoading && <Loader />}
      <div className='pt-24 px-9 text-[#3d434b] font-poppins'>
        <div>
          <h2 className='uppercase text-sm font-semibold mb-4'>Survey</h2>

          <div className='hidden md:grid grid-cols-10 px-4 text-xs font-semibold mb-2'>
            <div className='col-span-6'>QUESTIONS</div>
            <div className='col-span-2'>TYPE</div>
            <div className='col-span-2'>ACTION</div>
          </div>

          <div className='bg-white shadow-sm rounded-lg px-3 py-5 mb-4 flex flex-col md:grid md:grid-cols-10 md:items-center'>
            <div className='font-extrabold text-black mb-2 md:mb-0 col-span-6'>
              Entrance Test Survey Question 1
            </div>

            <div className='hidden md:block col-span-2'>Multiple Choice</div>

            <div className='w-full md:col-span-2'>
              <Link href='/questions/survey'>
              <button className={clsx(
                            'btn btn-md w-full px-5 py-2 rounded-md',
                            answers['survey1']
                              ? 'bg-white text-[#00d390] border border-[#00d390]'
                              : 'btn-success text-white'
                          )}>
                  {answers['survey1'] ? 'Modify' : 'Solve'}
                </button>
              </Link>
            </div>
          </div>

          <div className='bg-white shadow-sm rounded-lg px-3 py-5 mb-4 flex flex-col md:grid md:grid-cols-10 md:items-center'>
            <div className='font-extrabold text-black mb-2 md:mb-0 col-span-6'>
              Entrance Test Survey Question 2
            </div>

            <div className='hidden md:block col-span-2'>Multiple Choice</div>

            <div className='w-full md:col-span-2'>
              <Link href='/questions/survey'>
                <button className={clsx(
                            'btn btn-md w-full px-5 py-2 rounded-md',
                            answers['survey2']
                              ? 'bg-white text-[#00d390] border border-[#00d390]'
                              : 'btn-success text-white'
                          )}>
                  {answers['survey2'] ? 'Modify' : 'Solve'}
                </button>
              </Link>
            </div>
          </div>
        </div>
        {questions.length > 0 &&
          questions.map((question, sectionIndex) => (
            <div key={sectionIndex} className='mb-10'>
              {/* Section Title */}
              <h2 className='uppercase text-sm font-semibold mb-4'>
                {question.problemTopic}
              </h2>

              {/* Table Header - only for md and up */}
              <div className='hidden md:grid grid-cols-10 px-4 text-xs font-semibold mb-2'>
                <div className='col-span-6'>QUESTIONS</div>
                <div className='col-span-2'>TYPE</div>
                <div className='col-span-2'>ACTION</div>
              </div>

              {/* Questions */}
              {question.problemDescription &&
                question.problemDescription.map((q) => (
                  <div
                    key={q._id}
                    className='bg-white shadow-sm rounded-lg px-3 py-5 mb-4 flex flex-col md:grid md:grid-cols-10 md:items-center'
                  >
                    {/* Question Text */}
                    <div className='font-extrabold text-black mb-2 md:mb-0 col-span-6'>
                      {q.questionNumber}. {q.problemTitle}
                    </div>

                    {/* Type (hidden on small screens) */}
                    <div className='hidden md:block col-span-2'>
                      Multiple Choice
                    </div>

                    {/* Action Button */}
                    <div className='w-full md:col-span-2'>
                      <Link href={`/questions/${q._id}`}>
                        <button
                          className={clsx(
                            'btn btn-md w-full px-5 py-2 rounded-md',
                            answers[q.questionNumber]
                              ? 'bg-white text-[#00d390] border border-[#00d390]'
                              : 'btn-success text-white'
                          )}
                        >
                          {answers[q.questionNumber] ? 'Modify' : 'Solve'}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>

      <div className='w-full flex justify-center items-center fixed bottom-0'>
        <button className='btn btn-secondary text-white md:w-[30%] max-md:w-full text-lg' onClick={calculateScore}>Submit</button>
      </div>
    </div>
  );
};

export default QuestionsPage;
