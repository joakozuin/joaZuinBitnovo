// pages/payment-summary.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

interface PaymentInfo {
  amount: number;
  concept: string;
  currency: string;
}

const PaymentSummary: React.FC<{ paymentId: string }> = ({ paymentId }) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get(`/api/orders/info?paymentId=${paymentId}`);
        setPaymentInfo(response.data);
      } catch (error) {
        console.error('Error fetching payment info', error);
      }
    };

    const handleWebSocket = () => {
      const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/${paymentId}`);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setStatus(data.status);

        if (data.status === 'EX' || data.status === 'OC') {
          alert('Payment expired');
          // Redirigir a pantalla KO
        } else if (data.status === 'CO' || data.status === 'AC') {
          alert('Payment completed');
          // Redirigir a pantalla OK
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error', error);
      };

      return () => {
        socket.close();
      };
    };

    fetchPaymentInfo();
    const cleanupWebSocket = handleWebSocket();

    return () => {
      cleanupWebSocket();
    };
  }, [paymentId]);

  if (!paymentInfo) {
    return <p>Loading payment info...</p>;
  }

  return (
    <div>
      <h1>Payment Summary</h1>
      <p>Amount: {paymentInfo.amount}</p>
      <p>Concept: {paymentInfo.concept}</p>
      <p>Currency: {paymentInfo.currency}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default PaymentSummary;

