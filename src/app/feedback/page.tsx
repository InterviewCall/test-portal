'use client';

import axios, { AxiosError, AxiosResponse } from 'axios';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Loader from '@/components/Loader';
import { CANDIDATE_API } from '@/constants';
import { CandidateContext } from '@/contexts/CandidateContext';
import { TEST_STATUS } from '@/enums/TestStatus';
import { CandidateResponse, ErrorResponse } from '@/types';

export default function ThankYouPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { candidateDetails, setCandidate } = useContext(CandidateContext);
  const router = useRouter();

    useEffect(() => {
        if(!candidateDetails) {
            router.push('/');
            return;
        } else if(candidateDetails.testStatus == TEST_STATUS.INVITED || candidateDetails.testStatus == TEST_STATUS.IN_PROGRESS) {
            router.back();
            return;
        } else if(candidateDetails.testStatus == TEST_STATUS.EXPIRED) {
            router.push('/expired');
            return;
        }

        if((new Date(candidateDetails.dateOfTest) > new Date()) || (new Date(candidateDetails.startTime) > new Date())) {
            router.replace('/not-started');
            return;
        }

        if(candidateDetails.ratings) {
            setRating(candidateDetails.ratings);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [candidateDetails]);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    try {
        setIsLoading(true);
        const response: AxiosResponse<CandidateResponse> = await axios.patch(`${CANDIDATE_API}/update-ratings`, {
            email: candidateDetails.candidateEmail,
            ratings: rating
        });
        setCandidate(response.data.data);
        setIsLoading(false);
        toast.success('Thanks for the rating');
    } catch (error) {
        const err = error as AxiosError<ErrorResponse>;
        const message = err.response?.data.message || 'Something went wrong';
        toast.error(message);
    }
  };

  const hasRated = !!candidateDetails?.ratings;

  return (
    <>
    {isLoading && <Loader />}
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4'>
      <div className='bg-white shadow-xl rounded-3xl px-10 py-12 max-w-md w-full text-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-3'>🎉 Thank You!</h1>
        <p className='text-gray-600 text-lg mb-6'>
          You’ve completed the <span className='font-semibold text-indigo-600'>InterviewCall</span> entrance test.
          <br />
          How was your experience?
        </p>

        <div className={clsx('flex justify-center mb-6', hasRated && 'pointer-events-none')}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={36}
              className={clsx('transition-all transform', (hoverRating || rating) >= star ? 'text-yellow-400 scale-110 duration-200' : 'text-gray-300', !hasRated && 'cursor-pointer')}
              onClick={!hasRated ? () => setRating(star) : undefined}
              onMouseEnter={!hasRated ? () => setHoverRating(star) : undefined}
              onMouseLeave={!hasRated ? () => setHoverRating(0) : undefined}
              fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
            />
          ))}
        </div>

        <div className='flex flex-col gap-y-5'>
            <button
            onClick={handleSubmit}
            className={clsx('w-full hover:bg-indigo-700 transition-all text-white font-medium py-3 rounded-xl shadow-md', !hasRated ? 'cursor-pointer bg-indigo-600' : 'bg-gray-400 pointer-events-none')}
            >
            Submit Feedback
            </button>

            <button
            onClick={() => window.open(candidateDetails.reportCard!, '_blank')}
            className='w-full bg-green-500 hover:bg-green-600 transition-all text-white font-medium py-3 rounded-xl shadow-md cursor-pointer'
            >
            Show Report Card
            </button>
        </div>
      </div>
    </div>
    </>
  );
}
