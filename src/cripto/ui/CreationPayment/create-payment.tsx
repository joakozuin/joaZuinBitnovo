// pages/create-payment.tsx
'use client';
import { useState, useEffect } from 'react';

import Service from '../../services/currency/currency';
interface Currency {
  symbol: string;
  name: string;
  min_amount: number;
  max_amount: number;
  image: string;
}

const CreatePayment: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [concept, setConcept] = useState<string>('');
  const [currency, setCurrency] = useState<string>('');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  //const [paymentId, setPaymentId] = useState<string>('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await Service.getListCurrency();
        console.log("Estamos en create Payment")
        console.log(response)
        
        setCurrencies(response);
      } catch (error) {
        console.error('Error fetching currencies', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCreatePayment = async () => {
   /*  try {
      const response = await axios.post('/api/orders', {
        amount,
        concept,
        currency
      });
      setPaymentId(response.data.id);
    } catch (error) {
      console.error('Error creating payment', error);
    } */
  };

  const isAmountValid = (amount: number, currency: Currency) => {
    console.log('Dentro del isAmountValid');
    console.log('amount: ' + amount);
    console.log('currency.minAmount: ' + currency.min_amount);
    console.log('currency.maxAmount: ' + currency.max_amount);

    if (currency.min_amount && amount <= currency.max_amount) {
       console.log('Cumple');
       return true
    }
     else {
      console.log('No Cumple');
      return false
    }
    //return amount >= currency.minAmount && amount <= currency.maxAmount;

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
          .map((curr,index) => (
            <option key={index} value={curr.name}>
              {curr.name}
            </option>
          ))}
      </select>
      <button onClick={handleCreatePayment}>Create Payment</button>
     {/*  {paymentId && <p>Payment created with ID: {paymentId}</p>} */}
    </div>
  );
};

export default CreatePayment;
