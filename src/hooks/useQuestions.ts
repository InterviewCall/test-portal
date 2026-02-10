import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { PROBLEM_API } from '@/constants';
import { ProblemResponse } from '@/types';

function useQuestions(problemLevel: string | null) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['questions', problemLevel ?? ''],
        queryFn: fetchQuestions,
        staleTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
        // enabled: !!problemLevel
    });

    async function fetchQuestions() {
        const response: AxiosResponse<ProblemResponse> = await axios.get(`${PROBLEM_API}/get-all-problems`,{
            params: { problemLevel : problemLevel ?? 'Intermediate' }
        });
        return response.data;
    }

    const questions = data?.data ?? [];

    return {questions, isLoading, isError, error};
}

export default useQuestions;