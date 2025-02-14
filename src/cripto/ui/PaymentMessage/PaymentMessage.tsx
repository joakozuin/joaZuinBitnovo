'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./PaymentMessage.module.css";

const PaymentMessage: React.FC = () => {
  const router = useRouter();

  const [isPaid] = useState(true);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className={styles.paymentCard}>
      <div
        className={`${styles.icon} ${isPaid ? styles.success : styles.failure}`}
      >
        {isPaid ? <FaCheckCircle size={80} /> : <FaTimesCircle size={80} />}
      </div>
      <h2 className={styles.title}>
        {isPaid ? "¡Pago completado!" : "¡Pago cancelado!"}
      </h2>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor et varius
        dolor elit facilisi enim. Nulla ut ut eu nunc.
      </p>
      {/*       <button className={styles.actionButton} onClick={() => setIsPaid(!isPaid)}>
        {isPaid ? "Cancelar pago" : "Completar pago"}
      </button> */}

      <button
        type="button"
        className={styles.actionButton}
        onClick={handleBack}
      >
        Crear Nueva paga
      </button>
    </div>
  );
};

export default PaymentMessage;


