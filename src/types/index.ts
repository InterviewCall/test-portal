import { TEST_STATUS } from '@/enums/TestStatus';

export interface CodeStub {
    label: string
    language: string
    code: string
}

export interface ProblemDescription {
    _id: string
    questionNumber: number
    problemTitle: string
    problemStatement: string
    codeStubs: CodeStub[] | null
    options: string[]
    marks: number
}

export interface Problem {
    _id: string
    problemTopic: string
    problemDescription: ProblemDescription[]
    createdAt: Date
    updatedAt: Date
}

export interface ProblemResponse {
    data: Problem[]
}

export interface SingleProblemResponse {
    data: {
        problemDescription: ProblemDescription[]
    }
}

export interface ErrorResponse {
    success: false
    message: string
    data: unknown
    error: unknown 
}

// types/pdfReport.ts
export interface CandidateInfo {
    email: string;
    testName: string;
    takenOn: string;
    timeTaken: string;
    workExperience: string;
    invitedBy: string;
    invitedOn: string;
  }
  
  export interface ScoreInfo {
    percentage: number;
    obtainedMarks: number;
    totalMarks: number;
    testDuration: string;
    scoreDate: string;
  }
  
  export interface ReportProps {
    candidateName: string;
    scoreInfo: ScoreInfo;
    candidateInfo: CandidateInfo;
  }

  export interface QuestionBreakdown {
    questionNumber: number
    questionTitle: string
    isCorrect: boolean
    correctOption: string
    userAnswer: string | null
    marksAwarded: number
    marksTotal: number
}

export interface SectionBreakdown {
    section: string
    totalMarks: number 
    obtainedMarks: number
    questions: QuestionBreakdown[]
}

export interface FinalScoreReport {
    totalMarks: number
    obtainedMarks: number
    percentage: number
    sections: SectionBreakdown[]
}

export interface ScoreState extends FinalScoreReport {
    candidateName: string
    candidateEmail: string
    takenOn: Date
    invitedBy: string
    invitedOn: Date
    workExperience: string
}

export interface FinalScoreReportResponse {
    data: FinalScoreReport
}

export interface Candidate {
    candidateName: string
    candidateEmail: string
    startTime: Date
    endTime: Date
    invitedBy: string
    testStatus: TEST_STATUS
    // reportCard: string | null
    // percentage: number | null
    ratings: number | null
}

export interface CandidateResponse {
    data: Candidate
}
  

export type AnswerMap = Record<number | string, string>

export interface CandidateResult {
    candidateName: string
    candidateEmail: string
    invitedBy: string
    workExperience: string
    timeTaken: string
    takenOn: string
    invitedOn: string
    totalMarks: number
    obtainedMarks: number
    percentage: number
    sections: SectionBreakdown[]
}

export interface Result extends FinalScoreReport {
    takenOn: string
    timeTaken: string
    invitedBy: string
    invitedOn: string
    workExperience: string
}

export interface CandidateResultResponse {
    data: {
        candidateName: string
        candidateEmail: string
        result: Result
    }
}