import { FC } from 'react';

// import { codeData } from '@/constants';
import { CodeStub } from '@/types';

import CodeBlock from './CodeBlock';

interface Props {
    codeData: CodeStub[]
}

const CodeQuestionLayout: FC<Props> = ({ codeData }) => {
    return (
      <div className="max-w-4xl md:p-6 space-y-6 rounded-xl md:overflow-hidden overflow-x-scroll">
        {/* <h2 className="text-2xl font-bold text-gray-800">12. ENTRM5</h2>
        <p className="text-gray-700">What will be the output of this bitwise operation?</p> */}
  
        {codeData && codeData.map((item, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.label}:</h3>
            <CodeBlock code={item.code} language={item.language} />
          </div>
        ))}
      </div>
    );
  };
  
  export default CodeQuestionLayout;