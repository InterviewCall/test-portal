import { format } from 'date-fns';

import { CandidateResult } from '@/types';

export const formatDate = (date: Date) => format(date, 'dd MMMM, yyyy hh:mm a');

export const formatOnlyDate = (date: Date) => format(date, 'dd MMMM, yyyy');
  
export const formatTime = (time: Date) => format(time, 'h:mm aa');

export const formatDuration = (durationInMs: number) => {
    const minutes = Math.floor(durationInMs / 60000);
    const seconds = Math.floor((durationInMs % 60000) / 1000);
    return `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
};


export function pdfContent(candidateResult: CandidateResult) {
    const { candidateName, candidateEmail, percentage, totalMarks, obtainedMarks, invitedBy, invitedOn, takenOn, timeTaken, workExperience, sections } = candidateResult;
    const result = sections;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report Card</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: "Poppins", sans-serif;
        }

        .main-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .header {
            width: 100vw;
            background-color: #191e25;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 24px;
            color: white;
        }

        .headerLeft {
            display: flex;
            align-items: center;
            gap: 28px;
        }

        .headerTitle {
            font-weight: 600;
            font-size: 1.125rem;
        }

        .headerName {
            font-weight: 600;
            font-size: 1.25rem;
            text-transform: uppercase;
        }

        .container {
            width: 95%;
            margin: 0 auto;
            padding-top: 48px;
        }

        .topRow {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .wrapper {
            position: relative;
            width: 6rem;
            height: 6rem;
        }

        .svg {
            width: 100%;
            height: 100%;
            transform: rotate(135deg);
        }

        .bgCircle {
            stroke: #e5e7eb;
        }

        .progressCircle {
            transition: all 0.5s ease-in-out;
        }

        .pass {
            stroke: #22c55e;
            color: #22c55e;
        }
        
        .fail {
            stroke: #fb2c36;
            color: #fb2c36;
        }

        .centerText {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }

        .scoreText {
            font-size: 1.25rem;
            font-weight: bold;
        }

        .status {
            display: block;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            padding: 0.125rem 0.5rem;
            border-radius: 9999px;
        }

        .passBg {
            background-color: #dcfce7;
            color: #22c55e;
        }
        
        .failBg {
            background-color: #ffe2e2;
            color: #fb2c36;
        }

        .candidateName {
            color: #000000;
            font-size: 2.25rem;
            font-weight: 600;
            text-transform: uppercase;
        }

        .sectionStack {
            display: flex;
            flex-direction: column;
            gap: 64px;
            margin-top: 28px;
        }

        .card {
            width: 100%;
            border: 1.5px solid #e5e7eb;
            padding: 32px;
            color: #000000;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .cardTitle {
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .scoreRow {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .scorePercentage,
        .scoreBreakdown {
            font-size: 1.125rem;
        }
        
        .dot {
            font-size: 1.25rem;
        }
        
        .scoreInfo {
            color: #a1a1a1;
            font-size: 1.125rem;
        }

        .container {
            color: #1e2939;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .row {
            display: flex;
            align-items: flex-start;
            gap: 2.5rem;
            font-size: 16px;
            padding-left: 1.25rem;
        }
        
        .label {
            width: 9rem;
            color: #6a7282;
            font-weight: 500;
        }

        .resultContainer {
            color: #1e2939;
            font-size: 14px;
            width: 92%;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .topicTitle {
            font-weight: 600;
            font-size: 18px;
        }

        .tableWrapper {
            width: 100%;
            overflow-x: auto;
            border-radius: 0.375rem;
            border: 1px solid #d1d5dc;
        }

        .table {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
        }
        
        .thead {
            background-color: #d1d5dc;
            color: #000000;
            border-bottom: 1px solid #d1d5dc;
        }
        
        .th,
        .td {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
        }
        
        .th:nth-child(1) {
            width: 60px;
        }
        
        .th:nth-child(2) {
            width: 40px;
        }
        
        .th:nth-child(3) {
            width: 160px;
        }
        
        .th:nth-child(4),
        .th:nth-child(5) {
            width: 100px;
        }
        
        .th:nth-child(6) {
            width: 60px;
        }

        .tbodyRow {
            border-bottom: 1px solid #d1d5dc;
        }

        .statusCell {
            display: flex;
            justify-content: center;
        }
        
        .questionId {
            font-weight: 500;
            font-size: 14px;
        }
        
        .questionType {
            font-size: 12px;
            color: #6a7282;
        }
        
        .correctAnswer {
            color: #6a7282;
        }
        
        .score {
            font-weight: 500;
        }

        .icon {
            width: 16px;
            height: 16px;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .icon-cross {
            stroke: #fb2c36; /* red */
        }

        .icon-check {
            stroke: #28a745; /* green */
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div id="report">

            <!-- Header content -->
            <div class="header">
                <div class="headerLeft">
                    <img src="https://res.cloudinary.com/dntlt89bt/image/upload/v1745225415/logo_t4e55f.png" width="40px" height="45px" />
                    <span class="headerTitle">
                        InterviewCall Entrance Test
                    </span>
                </div>
                <p class="headerName">${candidateName}</p>
            </div>
            <!-- Header content -->

            <!-- Page content -->
            <div class="container">
                <div class="topRow">
                    <!-- Progressbar -->
                    <div class="wrapper">
                        <svg id="scoreGauge" class="svg" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-label='Score: ${percentage} percent. ${percentage >= 50 ? 'Pass' : 'Fail'}'>
                            <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                class="bgCircle"
                                stroke-width="3"
                                stroke-dasharray="75 100"
                                stroke-linecap="round"
                            />
                            <circle
                                id="progressCircle"
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                class="progressCircle ${percentage >= 50 ? 'pass' : 'fail'}"
                                stroke-width="3"
                                stroke-dasharray='${(percentage * 75) / 100} 100'
                                stroke-linecap="round"
                            />
                        </svg>

                        <div class="centerText">
                            <span id="scoreText" class="scoreText ${percentage >= 50 ? 'pass' : 'fail'}">${percentage}%</span>
                            <span id="status" class="status ${percentage >= 50 ? 'passBg' : 'failBg'}">${percentage >= 50 ? 'Pass' : 'Fail'}</span>
                        </div>
                    </div>
                    <!-- Progressbar -->

                    <p id="candidateName" class="candidateName">${candidateName}</p>
                </div>

                <div class="sectionStack">
                    <!-- Score Box -->
                    <div class="card">
                        <p class="cardTitle">Score</p>
                        <div>
                            <div class="scoreRow">
                                <p id="scorePercentage" class="scorePercentage">${percentage}%</p>
                                <p class="dot">•</p>
                                <p id="scoreBreakdown" class="scoreBreakdown">${obtainedMarks} / ${totalMarks}</p>
                            </div>
                            <p class="scoreInfo">
                                scored in InterviewCall Entrance Test
                            </p>
                        </div>
                    </div>
                    <!-- Score Box -->

                    <!-- Candidate Info -->
                    <div class="card">
                        <p class="cardTitle">Candidate Information</p>
                        <div class="container">
                            <div class="row">
                                <div class="label">Email</div>
                                <div id="email">${candidateEmail}</div>
                            </div>

                            <div class="row">
                                <div class="label">Test</div>
                                <div>InterviewCall Entrance Test</div>
                            </div>

                            <div class="row">
                                <div class="label">Taken On</div>
                                <div id="takenOn">${takenOn}</div>
                            </div>

                            <div class="row">
                                <div class="label">Time Taken</div>
                                <div id="timeTaken">${timeTaken}</div>
                            </div>

                            <div class="row">
                                <div class="label">Work Experience</div>
                                <div id="workExperience">${workExperience} years</div>
                            </div>
                            
                            <div class="row">
                                <div class="label">Invited By</div>
                                <div id="invitedBy">${invitedBy}</div>
                            </div>

                            <div class="row">
                                <div class="label">Invited On</div>
                                <div id="invitedOn">${invitedOn}</div>
                            </div>
                        </div>
                    </div>
                    <!-- Candidate Info -->

                    <!-- Result Section -->
                    <div id="resultSection" class="card">
                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[0].section} • ${result[0].obtainedMarks} / ${result[0].totalMarks}
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[0].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[0].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[0].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[0].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[0].questions[0].userAnswer ? result[0].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[0].questions[0].correctOption}</td>
                                            <td class="td score">${result[0].questions[0].marksAwarded} / ${result[0].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[0].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[0].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[0].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[0].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[0].questions[1].userAnswer ? result[0].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[0].questions[1].correctOption}</td>
                                            <td class="td score">${result[0].questions[1].marksAwarded} / ${result[0].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[1].section} • ${result[1].obtainedMarks} / ${result[1].totalMarks}
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[1].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[1].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[1].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[1].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[1].questions[0].userAnswer ? result[1].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[1].questions[0].correctOption}</td>
                                            <td class="td score">${result[1].questions[0].marksAwarded} / ${result[1].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[1].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[1].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[1].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[1].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[1].questions[1].userAnswer ? result[1].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[1].questions[1].correctOption}</td>
                                            <td class="td score">${result[1].questions[1].marksAwarded} / ${result[1].questions[1].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[1].questions[2].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[1].questions[2].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[1].questions[2].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[1].questions[2].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[1].questions[2].userAnswer ? result[1].questions[2].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[1].questions[2].correctOption}</td>
                                            <td class="td score">${result[1].questions[2].marksAwarded} / ${result[1].questions[2].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[2].section} • ${result[2].obtainedMarks} / ${result[2].totalMarks}
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[2].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[2].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[2].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[2].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[2].questions[0].userAnswer ? result[2].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[2].questions[0].correctOption}</td>
                                            <td class="td score">${result[2].questions[0].marksAwarded} / ${result[2].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[2].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[2].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[2].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[2].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[2].questions[1].userAnswer ? result[2].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[2].questions[1].correctOption}</td>
                                            <td class="td score">${result[2].questions[1].marksAwarded} / ${result[2].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[3].section} • ${result[3].obtainedMarks} / ${result[3].totalMarks}
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[3].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[3].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[3].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[3].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[3].questions[0].userAnswer ? result[3].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[3].questions[0].correctOption}</td>
                                            <td class="td score">${result[3].questions[0].marksAwarded} / ${result[3].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[3].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[3].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[3].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[3].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[3].questions[1].userAnswer ? result[3].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[3].questions[1].correctOption}</td>
                                            <td class="td score">${result[3].questions[1].marksAwarded} / ${result[3].questions[1].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[3].questions[2].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[3].questions[2].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[3].questions[2].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[3].questions[2].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[3].questions[2].userAnswer ? result[3].questions[2].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[3].questions[2].correctOption}</td>
                                            <td class="td score">${result[3].questions[1].marksAwarded} / ${result[3].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[4].section} • ${result[4].obtainedMarks} / ${result[4].totalMarks}
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[4].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[4].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[4].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[4].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[4].questions[0].userAnswer ? result[4].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[4].questions[0].correctOption}</td>
                                            <td class="td score">${result[4].questions[0].marksAwarded} / ${result[4].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[4].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[4].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[4].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[4].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[4].questions[1].userAnswer ? result[4].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[4].questions[1].correctOption}</td>
                                            <td class="td score">${result[4].questions[1].marksAwarded} / ${result[4].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[5].section} • ${result[5].obtainedMarks} / ${result[5].totalMarks}
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[5].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[5].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[5].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[5].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[5].questions[0].userAnswer ? result[5].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[5].questions[0].correctOption}</td>
                                            <td class="td score">${result[5].questions[0].marksAwarded} / ${result[5].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[5].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[5].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[5].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[5].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[5].questions[1].userAnswer ? result[5].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[5].questions[1].correctOption}</td>
                                            <td class="td score">${result[5].questions[1].marksAwarded} / ${result[5].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[6].section} • ${result[6].obtainedMarks} / ${result[6].totalMarks}
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[6].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[6].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[6].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[6].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[6].questions[0].userAnswer ? result[6].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[6].questions[0].correctOption}</td>
                                            <td class="td score">${result[6].questions[0].marksAwarded} / ${result[6].questions[0].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[7].section} • ${result[7].obtainedMarks} / ${result[7].totalMarks}
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[7].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[7].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[7].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[7].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[7].questions[0].userAnswer ? result[7].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[7].questions[0].correctOption}</td>
                                            <td class="td score">${result[7].questions[0].marksAwarded} / ${result[7].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[7].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[7].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[7].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[7].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[7].questions[1].userAnswer ? result[7].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[7].questions[1].correctOption}</td>
                                            <td class="td score">${result[7].questions[1].marksAwarded} / ${result[7].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[8].section} • ${result[8].obtainedMarks} / ${result[8].totalMarks}
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[8].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[8].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[8].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[8].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[8].questions[0].userAnswer ? result[8].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[8].questions[0].correctOption}</td>
                                            <td class="td score">${result[8].questions[0].marksAwarded} / ${result[8].questions[0].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[9].section} • ${result[9].obtainedMarks} / ${result[9].totalMarks}
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[9].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[9].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[9].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[9].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[9].questions[0].userAnswer ? result[9].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[9].questions[0].correctOption}</td>
                                            <td class="td score">${result[9].questions[0].marksAwarded} / ${result[9].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[9].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[9].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[9].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[9].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[9].questions[1].userAnswer ? result[9].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[9].questions[1].correctOption}</td>
                                            <td class="td score">${result[9].questions[1].marksAwarded} / ${result[9].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}