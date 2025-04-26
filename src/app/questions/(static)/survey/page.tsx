'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

import TestNavBar from '@/components/TestNavBar';

const Survey: FC = () => {
  const [selectedOptionOne, setSelectedOptionOne] = useState<string[]>([]);
  const [selectedOptionTwo, setSelectedOptionTwo] = useState<string[]>([]);
  const options = ['Yes', 'No'];
  const onCheckboxChangeOne = (opt: string) => {
    setSelectedOptionOne((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const onCheckboxChangeTwo = (opt: string) => {
    setSelectedOptionTwo((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };
  return (
    <div className='w-screen h-screen bg-[#f3f6f7] overflow-y-scroll overflow-x-hidden'>
      <TestNavBar />

      <div className='pt-16 text-[#3d434b] font-poppins'>
        <p className='p-8'>
        <span className='uppercase font-semibold max-md:text-sm text-gray-400'>Marks: </span> <span className='text-[#3d434b] font-semibold'>0 Points</span>
        </p>
        <div className='max-w-3xl p-8 rounded-lg'>
          <h1 className='text-xl font-bold mb-4'>
            Entrance Test Survey Question 1
          </h1>

          <p className='text-gray-700 mb-6 select-none md:w-screen w-full'>
            Please answer this question and help us customize the program and
            community for you. Note that this question will not have any impact
            on your entrance
          </p>

          <p className='text-gray-700 mb-6 select-none'>
            Can you write codes involving recursion, the usage of sorting
            function and hashmap?
          </p>

          <p className='font-semibold text-sm mb-3'>
            Pick <span className='font-bold'>ONE</span> option
          </p>

          <div className='space-y-4'>
            {options.map((opt) => (
              <label
                key={opt}
                className={`flex items-center bg-white border rounded-md px-4 py-2 cursor-pointer transition-colors duration-200 ${
                  selectedOptionOne.includes(opt)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
                }`}
              >
                <input
                  type='checkbox'
                  name='answer'
                  value={opt}
                  checked={selectedOptionOne.includes(opt)}
                  onChange={() => onCheckboxChangeOne(opt)}
                  className='radio mr-4 checked:bg-blue-600 checked:text-blue-400 bg-white'
                />
                <span className='text-gray-700'>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className='pt-16 text-[#3d434b] font-poppins'>
        <p className='p-8'>
            <span className='uppercase font-semibold max-md:text-sm text-gray-400'>Marks: </span> <span className='text-[#3d434b] font-semibold'>0 Points</span>
        </p>
        <div className='max-w-3xl p-8 rounded-lg'>
          <h1 className='text-xl font-bold mb-4'>
            Entrance Test Survey Question 2
          </h1>

          <p className='text-gray-700 mb-6 select-none md:w-screen w-full'>
            Please answer this question and help us customize the program and
            community for you. Note that this question will not have any impact
            on your entrance
          </p>

          <p className='text-gray-700 mb-6 select-none'>
            Can you write codes involving if/else, loops, and functions without taking any external help?
          </p>

          <p className='font-semibold text-sm mb-3'>
            Pick <span className='font-bold'>ONE</span> option
          </p>

          <div className='space-y-4'>
            {options.map((opt) => (
              <label
                key={opt}
                className={`flex items-center bg-white border rounded-md px-4 py-2 cursor-pointer transition-colors duration-200 ${
                    selectedOptionTwo.includes(opt)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
                }`}
              >
                <input
                  type='checkbox'
                  name='answer'
                  value={opt}
                  checked={selectedOptionTwo.includes(opt)}
                  onChange={() => onCheckboxChangeTwo(opt)}
                  className='radio mr-4 checked:bg-blue-600 checked:text-blue-400 bg-white'
                />
                <span className='text-gray-700'>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className='flex justify-center'>
      <Link href='/questions' className='pb-5'>
            <button className='btn btn-primary btn-lg'>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Survey;
