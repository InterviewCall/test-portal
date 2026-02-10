import { FC } from 'react';

// import { questionsSections } from '@/constants';
import { QuestionSectionType } from '@/types';

interface QuestionSectionProps {
  questionSection: QuestionSectionType[]
}

const QuestionSection: FC<QuestionSectionProps> = ({ questionSection }) => {
    return (
    <div className=''>
      <div className='shadow-xl rounded-xl md:w-[70%] w-full'>
        <table className='table w-full'>
          <thead className='bg-white text-[#3d434b] text-base'>
            <tr>
              <th>NUMBER</th>
              <th>SECTION</th>
              <th>QUESTIONS</th>
            </tr>
          </thead>
          <tbody className='bg-[#f3f6f7] text-[#3d434b]'>
            {questionSection.map(({ number, section, questions }) => (
              <tr key={number} className='hover'>
                <td>{number}</td>
                <td>{section}</td>
                <td>{questions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default QuestionSection;