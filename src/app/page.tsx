'use client';

import axios, { AxiosError, AxiosResponse } from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FC, useContext, useState } from 'react';
import toast from 'react-hot-toast';

import Loader from '@/components/Loader';
import QuestionSection from '@/components/QuestionSection';
import { CANDIDATE_API } from '@/constants';
import { CandidateContext } from '@/contexts/CandidateContext';
import { TEST_STATUS } from '@/enums/TestStatus';
import { CandidateResponse, ErrorResponse } from '@/types';

const Select = dynamic(() => import('react-select'), { ssr: false });

const options = Array.from({ length: 15 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString(),
}));


type OptionType = {
  value: number;
  label: string;
};

const Login: FC = () => {
  const { setCandidate } = useContext(CandidateContext);
  const [selectExperience, setSelectExperience] = useState<OptionType | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
  });

  const [inputOne, setInputOne] = useState(false);
  const [inputTwo, setInputTwo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  async function handleSubmit() {
    if(!formData.email) {
      toast.error('Please enter you email address');
      return;
    }

    if(!formData.fullName) {
      toast.error('Please enter you full name');
      return;
    }

    if(!selectExperience) {
      toast.error('Please select your work experience');
      return;
    }

    if(!inputOne) {
      toast.error('You have not checked yet!');
      return;
    }

    if(!inputTwo) {
      toast.error('You have not checked yet!');
      return;
    }
    
    try {
      setIsLoading(true);
      const response: AxiosResponse<CandidateResponse> = await axios.get(`${CANDIDATE_API}/get-test`, {
        params: {
          email: formData.email
        }
      });
      const candidateInfo = response.data.data;
      setCandidate(candidateInfo);
      console.log(candidateInfo);

      toast.success('Welcome Superstar!');

      if((new Date(candidateInfo.dateOfTest) > new Date()) || (new Date(candidateInfo.startTime) > new Date())) {
        router.replace('/not-started');
        return;
      }
      if(candidateInfo.testStatus == TEST_STATUS.EXPIRED) {
        router.push('/expired');
      } else if(candidateInfo.testStatus == TEST_STATUS.INVITED || candidateInfo.testStatus == TEST_STATUS.IN_PROGRESS) {
        router.push('/questions');
      } else if(candidateInfo.testStatus == TEST_STATUS.SUBMITTED) {
        router.replace('/feedback');
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const msg = err.response?.data.message || 'Something went wrong';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className='w-screen h-screen bg-white flex md:flex-row flex-col font-poppins'>
      {isLoading && <Loader />}
      <div className='md:w-[40%] max-md:h-[35%] w-full flex flex-col text-black md:gap-y-10 md:justify-center md:px-20 px-3 pt-3 max-md:mb-7'>
        <p className='md:text-xl text-base font-bold'>InterviewCall</p>

        <div className='flex flex-col gap-y-10'>
          <p className='text-[#8a8c93] md:text-xl text-sm font-semibold'>Hey Superstar,</p>
          <p className='md:text-4xl text-2xl font-bold text-left'>Welcome to InterviewCall&apos;s Entrance Test</p>

          <div className='flex gap-x-8'>
            <div className='flex flex-col'>
              <p className='text-[#8a8c93]'>Test Duration</p>
              <p className='text-black md:text-xl text-sm'>22 mins</p>
            </div>

            <div className='flex flex-col'>
              <p className='text-[#8a8c93]'>No. of questions</p>
              <p className='text-black md:text-xl text-sm'>22 questions</p>
            </div>
          </div>
        </div>

        {/* <div className='flex gap-x-4 text-[#3579b4] font-bold'>
          <p className='underline decoration-dashed'>Platform Help</p>
          <p>|</p>
          <p className='underline decoration-dashed'>Execution Environment</p>
          <p>|</p>
          <p className='underline decoration-dashed'>FAQ</p>
        </div> */}
      </div>
      <div className='md:w-[60%] max-md:h-[65%] w-full bg-[#f3f6f7] text-[#3d434b] flex flex-col md:py-12 py-6 md:px-14 px-2 md:gap-y-10 gap-y-7 overflow-y-scroll'>
        <p className='md:text-5xl text-3xl'>Sections</p>
        <p>There are 11 sections that are part of this test.</p>
        <QuestionSection />
        <p className='md:text-5xl text-3xl'>Confirmation Form</p>
        <p>Before we start, here is some extra information we need to asses you better.</p>

        <div className='flex flex-col text-[#8a8c93] font-semibold gap-y-2'>
          <p>Email address/Login<span className='text-red-500'>*</span></p>
          <input 
            type='text'
            className='bg-white p-2 border-b-[1px] rounded-md focus:outline-none md:w-[70%] w-full placeholder:font-light shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
            placeholder='Enter Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className='flex flex-col text-[#8a8c93] font-semibold gap-y-2'>
          <p>Full Name<span className='text-red-500'>*</span></p>
          <input 
            type='text'
            className='bg-white p-2 border-b-[1px] rounded-md focus:outline-none md:w-[70%] w-full placeholder:font-light shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
            placeholder='Enter Full Name'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className='flex flex-col text-[#8a8c93] font-semibold gap-y-2'>
          <p>Work Experience (in years)<span className='text-red-500'>*</span></p>
          <Select
            options={options}
            value={selectExperience}
            placeholder='Select'
            className='text-[#8a8c93] cursor-pointer placeholder:font-light md:w-[30%] w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
            isSearchable
            onChange={(selectedOption) => {
              const selected = selectedOption as OptionType;
              setSelectExperience(selected);
              sessionStorage.setItem('workExperience', JSON.stringify(selected));
            }}
            styles={{
              control: (provided) => ({
                ...provided,
                padding: '0.15rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
              }),
              placeholder: (provided) => ({
                ...provided,
                fontWeight: 100,
                color: '#8a8c93',
              }),
            }}
          />
        </div>

        <div className='flex flex-col w-full gap-y-10'>
          <p>Declaration Statement<span className='text-red-500'>*</span></p>
          <div className='flex gap-x-5 md:w-[80%] w-full'>
            <input type='checkbox' onChange={(e) => setInputOne(e.target.checked)} className='checkbox checkbox-lg bg-white text-black checked:bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]' />
            <p className='text-[#8a8c93] font-semibold'>I agree not to copy code from any source, including colleagues, and will refrain from accessing websites or AI tools for assistances. I further agree not to copy or share any content or questions from this assesment with any other medium or forum.</p>
          </div>

          <div className='flex gap-x-5 md:w-[80%] w-full'>
            <input type='checkbox' onChange={(e) => setInputTwo(e.target.checked)} className='checkbox checkbox-lg bg-white text-black checked:bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]' />
            <p className='text-[#8a8c93] font-semibold'>I agree to InterviewCall&apos;s <span className='text-[#3579b4] underline'>Terms of Service</span> and <span className='text-[#3579b4] underline'>Privacy Policy</span></p>
          </div>
        </div>

        <button onClick={handleSubmit} className='w-fit bg-[#098931] hover:bg-green-800 duration-200 text-white px-4 py-3 cursor-pointer rounded-lg font-semibold shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>Agree and Start</button>

      </div>
    </div>
  );
};

export default Login;