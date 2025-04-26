import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { PROBLEM_API } from '@/constants';
import { ProblemResponse } from '@/types';

function useQuestions() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['questions'],
        queryFn: fetchQuestions,
        staleTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
    });

    async function fetchQuestions() {
        const response: AxiosResponse<ProblemResponse> = await axios.get(`${PROBLEM_API}/get-all-problems`);
        return response.data;
    }

    const questions = data?.data ?? [];

    return {questions, isLoading, isError, error};
}

export default useQuestions;