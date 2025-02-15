'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
const Welcome = () => {
    const router = useRouter();

    const handleBack = () => {

    
        router.push('/payment');
      };
  return (
    <div>
      <button onClick={handleBack} > Quiere realizar un nuevo pago</button>
    </div>
  )
}

export default Welcome
