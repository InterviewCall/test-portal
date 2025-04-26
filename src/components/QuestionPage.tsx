'use client';

import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

import { AnswerContext } from '@/contexts/AnswerContext';
import { CandidateContext } from '@/contexts/CandidateContext';
import { TEST_STATUS } from '@/enums/TestStatus';
import { CodeStub, ErrorResponse } from '@/types';
import calculateTotalScore from '@/utils/calculateTotalScore';

import CodeQuestionLayout from './CodeQuestionLayout';
import SubmitLoader from './SubmitLoader';

interface QuestionProps {
  questionNumber: number;
  questionTitle: string;
  questionStatement: string;
  options: string[];
  codeStubs: CodeStub[] | null;
  marks: number
};

const QuestionPage: FC<QuestionProps> = ({ questionNumber, questionTitle, questionStatement, options, codeStubs, marks }) => {
  const { answers, setAnswer, clearOption } = useContext(AnswerContext);
  const { candidateDetails, setCandidate, setLoader } = useContext(CandidateContext);
  const router = useRouter();
  const selectedOption = answers[questionNumber] ?? null;

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
    if(candidateDetails?.testStatus == TEST_STATUS.SUBMITTED) {
      router.replace('/feedback');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateDetails]);
  return (
    <div className='md:p-8 overflow-x-hidden'>
      <SubmitLoader />
      <p className='md:absolute md:right-16 max-md:translate-x-[60%] mt-5 text-[#3d434b]'><span className='uppercase font-semibold max-md:text-sm text-gray-400'>marks:</span> <span className='font-semibold'>{marks} points</span></p>
      <div className='max-w-3xl md:p-8 p-6 rounded-lg'>
        {/* Question Number & Code */}
        <h1 className='text-xl font-bold mb-4'>
          {questionNumber}. {questionTitle}
        </h1>

        {/* Question Text */}
        <p className='text-gray-700 mb-6 select-none'>{questionStatement}</p>

        {/* Instruction */}
        <p className='font-semibold text-sm mb-3'>
          Pick <span className='font-bold'>ONE</span> option
        </p>

        {codeStubs && <CodeQuestionLayout codeData={codeStubs} />}

        {/* Options */}
        <div className='space-y-4 max-md:mt-4'>
          {options.map((opt) => (
            <label
              key={opt}
              className={`flex items-center bg-white border rounded-md px-4 py-2 cursor-pointer ${
                selectedOption === opt
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300'
              }`}
            >
              <input
                type='radio'
                name='answer'
                value={opt}
                checked={selectedOption === opt}
                onChange={() => setAnswer(questionNumber, opt)}
                className='radio mr-4 checked:bg-blue-600 checked:text-blue-400 bg-white'
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>

        {/* Clear Selection */}
        <div className='flex w-full justify-between items-center mt-7'>
          <button
            onClick={() => clearOption(questionNumber)}
            className='text-sm text-gray-500 hover:text-gray-700 underline cursor-pointer'
          >
            Clear Selection
          </button>

          <Link href='/questions'>
            <button className='btn btn-primary btn-lg'>Back</button>
          </Link>
        </div>

        {questionNumber == 20 && <button onClick={calculateScore} className='btn btn-block btn-lg btn-success text-white mt-4'>Submit</button>}
      </div>
    </div>
  );
};

export default QuestionPage;