import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./PaymentMessage.module.css";
import { useRouter } from 'next/navigation';

const SuccessMessage: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/payment');
  };

  return (
    <div className={styles.paymentCard}>
      <div className={`${styles.icon} ${styles.success}`}>
        <FaCheckCircle size={80} />
      </div>
      <h2 className={styles.title}>¡Pago completado!</h2>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor et varius
        dolor elit facilisi enim. Nulla ut ut eu nunc.
      </p>
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

export default SuccessMessage;