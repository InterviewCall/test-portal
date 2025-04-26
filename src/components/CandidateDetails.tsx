import React from 'react';

import styles from '@/styles/CandidateDetails.module.css';

interface CandidateDetailsProps {
  email: string;
  testName: string;
  takenOn: string;
  timeTaken: string;
  workExperience: string;
  invitedBy: string;
  invitedOn: string;
}

const CandidateDetails: React.FC<CandidateDetailsProps> = ({
  email,
  testName,
  takenOn,
  timeTaken,
  workExperience,
  invitedBy,
  invitedOn,
}) => {
  return (
    <div className={styles.container}>
      <Row label='Email' value={email} />
      <Row label='Test' value={testName} />
      <Row label='Taken on' value={takenOn} />
      <Row label='Time taken' value={timeTaken} />
      <Row label='Work Experience' value={workExperience} />
      <Row label='Invited by' value={invitedBy} />
      <Row label='Invited on' value={invitedOn} />
    </div>
  );
};

const Row = ({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) => (
  <div className={styles.row}>
    <div className={styles.label}>{label}</div>
    <div>{value}</div>
  </div>
);

export default CandidateDetails;
