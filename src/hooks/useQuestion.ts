import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { PROBLEM_API } from '@/constants';
import { SingleProblemResponse } from '@/types';

function useQuestion(questionId: string) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['question', questionId],
        queryFn: fetchQuestion,
        staleTime: 1000 * 60 * 60 * 24,
        enabled: !!questionId
    });

    async function fetchQuestion() {
        const response: AxiosResponse<SingleProblemResponse> = await axios.get(`${PROBLEM_API}/get-problem/${questionId}`);
        return response.data;
    }

    const question = data?.data?.problemDescription ?? [];

    return { question, isLoading, isError, error };
}

export default useQuestion;