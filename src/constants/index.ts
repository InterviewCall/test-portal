import { CodeStub } from '@/types';

export const questionsSections = [
    { number: 1, section: 'Survey', questions: 2 },
    { number: 2, section: 'Time Complexity & Algorithm Analysis', questions: 2 },
    { number: 3, section: 'Recursion & Dynamic Programming', questions: 3 },
    { number: 4, section: 'Sorting and Searching', questions: 2 },
    { number: 5, section: 'Logical Reasoning &Mathematics', questions: 3 },
    { number: 6, section: 'Graph Theory & Trees', questions: 2 },
    { number: 7, section: 'Probability & Combinations', questions: 2 },
    { number: 8, section: 'Number Theory', questions: 1 },
    { number: 9, section: 'String Manipulation', questions: 2 },
    { number: 10, section: 'Data Structures', questions: 1 },
    { number: 11, section: 'Tricky Programming Questions', questions: 2 },
];

type Question = {
    id: number;
    title: string;
    type: string;
  };
  
  type Section = {
    title: string;
    questions: Question[];
  };
  
export const sections: Section[] = [
    {
      title: 'Survey',
      questions: [
        { id: 1, title: 'Entrance Test Survey Question 1', type: 'Multiple Choice' },
        { id: 2, title: 'Entrance Test Survey Question 2', type: 'Multiple Choice' },
      ],
    },
    {
      title: 'Time Complexity & Algorithm Analysis',
      questions: [
        { id: 3, title: 'ENTTCAA1', type: 'Multiple Choice' },
        { id: 4, title: 'ENTTCAA2', type: 'Multiple Choice' },
      ],
    },
];

export const codeData: CodeStub[] = [
    {
      label: 'C++',
      language: 'cpp',
      code: 'int a = 5;\nint b = 7;\ncout << (a ^ b);'
    },
    {
      label: 'Java',
      language: 'cpp',
      code: 'public class Main {\n  public static void main(String[] args) {\n    int a = 5;\n    int b = 7;\n    System.out.println(a ^ b); // XOR operation\n  }\n}'
    },
    {
      label: 'Python',
      language: 'python',
      code: 'a = 5\nb = 7\nprint(a ^ b)  # XOR operation'
    },
    {
      label: 'JavaScript',
      language: 'javaScript',
      code: 'let a = 5;\nlet b = 7;\nconsole.log(a ^ b); // XOR operation'
    }
];

export const PROBLEM_API = process.env.NEXT_PUBLIC_PROBLEM_API!;
export const CANDIDATE_API = process.env.NEXT_PUBLIC_CANDIDATE_API!;

export const MAX_DURATION_MS_INTERMEDIATE = 22.12 * 60 * 1000;

export const MAX_DURATION_MS_ADVANCED = 20 * 60 * 1000;
