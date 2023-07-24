'use client';

import useViewportSize from '@/useViewportSize';
import React from 'react';
import Confetti from 'react-confetti';

export default function SuccessPage() {
  const { height, width } = useViewportSize();

  // console.log('height', height);
  // console.log('width', width);

  return (
    <div className="flex items-center justify-center bg-slate-800 h-full overflow-hidden">
      <div>가입 성공!!</div>
      <Confetti
        numberOfPieces={300}
        recycle={false}
        width={width}
        height={height}
      />
    </div>
  );
}
