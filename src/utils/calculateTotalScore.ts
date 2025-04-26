import axios, { AxiosResponse } from 'axios';

import { PROBLEM_API } from '@/constants';
import { AnswerMap, Candidate, CandidateResponse, FinalScoreReportResponse } from '@/types';

import { formatDate, formatDuration, formatOnlyDate } from '.';

async function calculateTotalScore(candidateDetails: Candidate, answers: AnswerMap) {
    const candidateName = candidateDetails?.candidateName;
    const candidateEmail = candidateDetails?.candidateEmail;
    const invitedOn = formatOnlyDate(candidateDetails?.dateOfTest as Date);
    const takenOn = formatDate(new Date(sessionStorage.getItem('testStartTime')!));
    const startTime = new Date(sessionStorage.getItem('testStartTime')!);
    const endTime = new Date();
    const timeTakenInMs = endTime.getTime() - startTime.getTime();
    const timeTaken = formatDuration(timeTakenInMs);
    const storedExp = sessionStorage.getItem('workExperience')!;
    const workExperience = JSON.parse(storedExp).label;
    const invitedBy = candidateDetails?.invitedBy;
    try {
      const response: AxiosResponse<FinalScoreReportResponse> = await axios.post(`${PROBLEM_API}/calculate-score`, {
        userAnswers: answers,
      });

      const candidateResult = response.data.data;
      const { percentage, totalMarks, obtainedMarks, sections } = candidateResult;

      const candidateResponse: AxiosResponse<CandidateResponse> = await axios.post('/api/submit-test', {
        candidateResult: {
          candidateName,
          candidateEmail,
          invitedBy,
          workExperience,
          timeTaken,
          takenOn,
          invitedOn,
          percentage,
          totalMarks,
          obtainedMarks,
          sections
        }
      });

      return candidateResponse.data.data;
    } catch (error) {
      throw error;
    }
}

export default calculateTotalScore;