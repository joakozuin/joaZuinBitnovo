'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import styles from './welcome.module.css';
const Welcome = () => {
    const router = useRouter();

    const handleBack = () => {

    
        router.push('/payment');
      };
  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.button}>
        Realizar un nuevo Pago
      </button>
    </div>
  )
}

export default Welcome
