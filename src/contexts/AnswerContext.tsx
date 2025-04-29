'use client';

import { createContext, FC, ReactNode, useEffect, useState } from 'react';

import { AnswerMap, FinalScoreReport, ScoreState } from '@/types';

interface ContextData {
    answers: AnswerMap
    scoreSection: ScoreState
    setScore: (data: FinalScoreReport) => void
    setAnswer: (questionNumber: number | string, option: string) => void;
    clearOption: (questionNumber: number | string) => void
}

interface ContextProps {
    children: ReactNode
}

export const AnswerContext = createContext<ContextData>(null!);

const AnswerContextProvider: FC<ContextProps> = ({ children }) => {
    const [answers, setAnswers] = useState<AnswerMap>({});
    const [scoreSection, setScoreSection] = useState<ScoreState>({
        candidateName: 'Arijit Ganguly',
        candidateEmail: 'arijeetganguli32@gmail.com',
        invitedBy: 'Prithviraj Paul',
        invitedOn: new Date(),
        workExperience: '5 years',
        totalMarks: 0,
        obtainedMarks: 0,
        percentage: 0,
        takenOn: new Date(),
        sections: []
    });

    useEffect(() => {
        const stored = sessionStorage.getItem('userAnswer');
        if(stored) setAnswers(JSON.parse(stored));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('userAnswer', JSON.stringify(answers));
    }, [answers]);

    function setAnswer(questionNumber: number | string, option: string) {
        setAnswers((prev) => ({
            ...prev,
            [questionNumber]: option
        }));
    }

    function setScore(data: FinalScoreReport) {
        setScoreSection((prev) => ({
            ...prev,
            totalMarks: data.totalMarks,
            obtainedMarks: data.obtainedMarks,
            percentage: data.percentage,
            sections: data.sections
        }));
    }

    function clearOption(questionNumber: number | string) {
        setAnswers((prev) => {
            const updated = { ...prev };
            delete updated[questionNumber];
            return updated;
        });
    }

    return (
        <AnswerContext.Provider value={{ answers, scoreSection, setScore, setAnswer, clearOption }}>
            { children }
        </AnswerContext.Provider>
    );
};

export default AnswerContextProvider;