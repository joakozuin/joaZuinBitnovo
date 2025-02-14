// pages/create-payment.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Currency {
  code: string;
  name: string;
  minAmount: number;
  maxAmount: number;
}

const CreatePayment: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [concept, setConcept] = useState<string>('');
  const [currency, setCurrency] = useState<string>('');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [paymentId, setPaymentId] = useState<string>('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('/api/currencies');
        setCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching currencies', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCreatePayment = async () => {
    try {
      const response = await axios.post('/api/orders', {
        amount,
        concept,
        currency
      });
      setPaymentId(response.data.id);
    } catch (error) {
      console.error('Error creating payment', error);
    }
  };

  const isAmountValid = (amount: number, currency: Currency) => {
    return amount >= currency.minAmount && amount <= currency.maxAmount;
  };

  return (
    <div>
      <h1>Create Payment</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
      />
      <input
        type="text"
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
        placeholder="Concept"
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        {currencies
          .filter((curr) => isAmountValid(amount, curr))
          .map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.name}
            </option>
          ))}
      </select>
      <button onClick={handleCreatePayment}>Create Payment</button>
      {paymentId && <p>Payment created with ID: {paymentId}</p>}
    </div>
  );
};

export default CreatePayment;
