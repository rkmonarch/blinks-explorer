'use client';

import Lottie from 'react-lottie';
import animationData from './eye_blink.json';

const LogoAnimation = () => {
  const animationURL =
    'https://assets3.lottiefiles.com/packages/lf20_JExdDIS87T.json';

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className='relative'>
      <div className='w-3 h-2 absolute z-10 bg-white bottom-0 right-0'></div>
      <Lottie options={defaultOptions} height={43} width={48} />
    </div>
  );
};

export default LogoAnimation;
