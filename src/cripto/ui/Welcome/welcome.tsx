'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import styles from './welcome.module.css';
const Welcome = () => {
    const router = useRouter();

    const handleBotton = () => {
        router.push('/payment');
      };
  return (
    <div className={styles.container}>
      <button onClick={handleBotton} className={styles.button}>
        Realizar un nuevo Pago
      </button>
    </div>
  )
}

export default Welcome
