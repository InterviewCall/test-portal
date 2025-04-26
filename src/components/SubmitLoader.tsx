'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { FC, useContext } from 'react';

import { CandidateContext } from '@/contexts/CandidateContext';

const SubmitLoader: FC = () => {
  const { submitLoader } = useContext(CandidateContext);

  if (submitLoader === 'hidden' || submitLoader === '') return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-24 h-24">
        {submitLoader === 'loading' && (
          <motion.div
            key="spinner"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          >
            <svg className="w-full h-full" viewBox="0 0 50 50">
              <defs>
                <linearGradient
                  id="richGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#03fce3" />
                  <stop offset="100%" stopColor="#03f0fc" />
                </linearGradient>
              </defs>
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="url(#richGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="90"
                strokeDashoffset="20"
              />
            </svg>
          </motion.div>
        )}

        {submitLoader === 'success' && (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            className="flex items-center justify-center w-full h-full rounded-full bg-green-500"
          >
            <Check className="text-white w-10 h-10" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubmitLoader;
// shadow-[0_0_20px_#22c55e]
// drop-shadow-[0_0_5px_#ffffff]