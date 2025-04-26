'use client';

import { createContext, FC, ReactNode, useEffect, useState } from 'react';

import { TEST_STATUS } from '@/enums/TestStatus';
import { Candidate } from '@/types';

interface ContextData {
    candidateDetails: Candidate
    submitLoader: 'loading' | 'success' | 'hidden' | ''
    setCandidate: (data: Candidate) => void
    setCandidateStatus: (data: TEST_STATUS) => void
    setLoader: (state: 'loading' | 'success' | 'hidden') => void
}

interface ContexProps {
    children: ReactNode
}

export const CandidateContext = createContext<ContextData>(null!);

const CandidateContextProvider: FC<ContexProps> = ({ children }) => {
    const [candidateDetails, setCandidateDetails] = useState<Candidate>(null!);
    const [loading, setLoading] = useState(true);
    const [submitLoader, setSubmitLoader] = useState<'loading' | 'success' | 'hidden' | ''>('');

    function setCandidate(data: Candidate) {
        setCandidateDetails(data);
        sessionStorage.setItem('candidateDetails', JSON.stringify(data));
    }

    function setLoader(state: 'loading' | 'success' | 'hidden') {
        setSubmitLoader(state);
    }
    
    function setCandidateStatus(status: TEST_STATUS) {
        setCandidateDetails((prev) => {
          if (!prev) return prev;
      
          return {
            ...prev,
            testStatus: status,
          };
        });
      }

    useEffect(() => {
        const stored = sessionStorage.getItem('candidateDetails');
        if(stored) setCandidateDetails(JSON.parse(stored));
        setLoading(false);
    }, []);

    if (loading) return null;

    return (
        <CandidateContext.Provider value={{ candidateDetails, setCandidate, setCandidateStatus, submitLoader, setLoader }}>
            { children }
        </CandidateContext.Provider>
    );
};

export default CandidateContextProvider;