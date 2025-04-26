// import clsx from 'clsx';
// import React from 'react';

// interface GaugeProps {
//   score: number; // 0–100
// }

// const ProgressBar: React.FC<GaugeProps> = ({ score }) => {
//   // Stroke values (total = 100)
//   const backgroundDash = '75 100'; // always same
//   const progressDash = `${(score * 75) / 100} 100`; // proportional to background

//   return (
//     <div className='relative size-24'>
//       <svg className='size-full rotate-[135deg]' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
//         {/* Background Circle */}
//         <circle
//           cx='18'
//           cy='18'
//           r='16'
//           fill='none'
//           className='stroke-current text-[#e5e7eb]'
//           strokeWidth={3}
//           strokeDasharray={backgroundDash}
//           strokeLinecap='round'
//         />
//         {/* Progress Circle */}
//         <circle
//           cx='18'
//           cy='18'
//           r='16'
//           fill='none'
//           className={clsx('stroke-current', score >= 50 ? 'text-[#22c55e]' : 'text-[#fb2c36]')}
//           strokeWidth={3}
//           strokeDasharray={progressDash}
//           strokeLinecap='round'
//         />
//       </svg>

//       {/* Center Text */}
//       <div className='absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
//         <span className={clsx('text-xl font-bold', score >= 50 ? 'text-[#22c55e]' : 'text-[#fb2c36]')}>
//           {score}%
//         </span>
//         <span className={clsx('block text-sm rounded-full', score >= 50 ? 'text-[#22c55e] bg-[#dcfce7]' : 'text-[#fb2c36] bg-[#ffe2e2]')}>
//           {score >= 50 ? 'Pass' : 'Fail'}
//         </span>
//       </div>
//     </div>
//   );
// };

import clsx from 'clsx';
import React from 'react';

import styles from '@/styles/ProgressBar.module.css';

interface GaugeProps {
  score: number; // 0–100
}

const ProgressBar: React.FC<GaugeProps> = ({ score }) => {
  const backgroundDash = '75 100';
  const progressDash = `${(score * 75) / 100} 100`;

  const isPass = score >= 50;

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.svg}
        viewBox='0 0 36 36'
        xmlns='http://www.w3.org/2000/svg'
        aria-label={`Score: ${score} percent. ${isPass ? 'Pass' : 'Fail'}`}
      >
        <circle
          cx='18'
          cy='18'
          r='16'
          fill='none'
          className={styles.bgCircle}
          strokeWidth={3}
          strokeDasharray={backgroundDash}
          strokeLinecap='round'
        />
        <circle
          cx='18'
          cy='18'
          r='16'
          fill='none'
          className={clsx(styles.progressCircle, isPass ? styles.pass : styles.fail)}
          strokeWidth={3}
          strokeDasharray={progressDash}
          strokeLinecap='round'
        />
      </svg>

      <div className={styles.centerText}>
        <span className={clsx(styles.scoreText, isPass ? styles.pass : styles.fail)}>
          {score}%
        </span>
        <span className={clsx(styles.status, isPass ? styles.passBg : styles.failBg)}>
          {isPass ? 'Pass' : 'Fail'}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;


// export default ProgressBar;

// 'use client';

// import { Path,Svg, Text, View } from '@react-pdf/renderer';
// import React, { useEffect,useState } from 'react';

// interface GaugeProps {
//   score: number; // 0–100
// }

// const ProgressBar: React.FC<GaugeProps> = ({ score }) => {
//   const [isClient, setIsClient] = useState(false);

//   // Use effect to ensure this runs only on the client
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Only render the progress bar on the client side
//   if (!isClient) return null;

//   // Stroke values (total = 100)
//   const backgroundDash = '75 100'; // always same
//   const progressDash = `${(score * 75) / 100} 100`; // proportional to background

//   const strokeColor = score >= 50 ? '#22c55e' : '#fb2c36';
//   const textColor = score >= 50 ? '#22c55e' : '#fb2c36';
//   const passFail = score >= 50 ? 'Pass' : 'Fail';

//   return (
//     <View style={{ position: 'relative', width: 120, height: 120 }}>
//       <Svg width='120' height='120' viewBox='0 0 36 36' style={{ transform: 'rotate(135deg)' }}>
//         {/* Background Circle */}
//         <Path
//           d='M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32'
//           fill='none'
//           stroke='#e5e7eb'
//           strokeWidth={3}
//           strokeDasharray={backgroundDash}
//           strokeLinecap='round'
//         />
//         {/* Progress Circle */}
//         <Path
//           d='M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32'
//           fill='none'
//           stroke={strokeColor}
//           strokeWidth={3}
//           strokeDasharray={progressDash}
//           strokeLinecap='round'
//         />
//       </Svg>

//       {/* Center Text */}
//       <View
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           textAlign: 'center',
//         }}
//       >
//         <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>
//           {score}%
//         </Text>
//         <Text
//           style={{
//             fontSize: 10,
//             fontWeight: 'bold',
//             color: textColor,
//             backgroundColor: score >= 50 ? '#dcfce7' : '#ffe2e2',
//             borderRadius: 9999,
//             padding: '3px 8px',
//             marginTop: 4,
//           }}
//         >
//           {passFail}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default ProgressBar;


