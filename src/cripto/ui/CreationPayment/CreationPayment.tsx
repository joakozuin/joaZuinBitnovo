'use client';

import React, { useEffect, useState,ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CiCircleInfo } from "react-icons/ci";
import Select from 'react-select';
import styles from './CreationPayment.module.css';
import ServiceCurrency from '../../services/currency/currency';
//import ServiceOrder from '../../services/orders/orders'
//import { useStore } from '../../store/useStore';

interface CurrencyOption {
  symbol: string;
  name: string;
  min_amount: number;
  max_amount: number;
  image: string;
}

export default function CreatePayment() {
  const router = useRouter();

  // Estados locales
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [currency, setCurrency] = useState<CurrencyOption[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption | null>(null);
  const [identifier, setIdentifier] = useState<string | null>('');
  
  // Estado global con nombres distintos para evitar conflictos
  /* const { 
    setAmount: setGlobalAmount, 
    setConcept: setGlobalConcept, 
    setSelectedCurrency: setGlobalSelectedCurrency 
  } = useStore(); */

  // Validar si el formulario está completo
  const isFormComplete = selectedCurrency && amount && Number(amount) > 0 && concept;

  // Obtener lista de monedas desde el servicio
  useEffect(() => {
    
    const fetchCurrencies = async () => {
      const data: CurrencyOption[] = await ServiceCurrency.getListCurrency();

        console.log("Lista de monedas disponibles:", data);

          setCurrencies(data);
          setCurrency(data);
     
    };

    fetchCurrencies();
  }, []);

  // Sincronizar estados locales con Zustand
  /* useEffect(() => {
    setGlobalAmount(amount);
    setGlobalConcept(concept);
    if (selectedCurrency) {
      setGlobalSelectedCurrency(selectedCurrency);
    }
  }, [amount, concept, selectedCurrency, setGlobalAmount, setGlobalConcept, setGlobalSelectedCurrency]); */

  // Manejar cambio de moneda seleccionada
 /*  const handleCurrencyChange = (selectedOption: CurrencyOption | null) => {
    setSelectedCurrency(selectedOption);
  }; */

  const handleCurrencyChange = (selectedOption: CurrencyOption | null) => {
    setSelectedCurrency(selectedOption); 
  };

  const handleCreateOrder = async() => {
    console.log("Información del formulario:");
    console.log("Importe:", amount);
    console.log("Concepto:", concept);
    console.log("Moneda seleccionada:", selectedCurrency?.name);
    
    const dataObject = {
      amount,
      concept,
      selectedCurrency}

     //Como no tenemos un usuario autenticado, estamos trabajando en un test
     //recortado, no podemos interactuar con el endpoint POST_order,
     // entonces  utilizamos un

     const identifier:string="14d3030c-3b61-4070-b902-342f80e99364"


    /*  const response = await ServiceOrder.postOrderCreate( dataObject);
     setIdentifier(response?.identifier); */

     //router.push('/payment/order1');

    router.push(`/payment/order/${identifier}`);
    
  };

  const isAmountValid = (amount: number,currency: CurrencyOption) => {
    return amount >=currency.min_amount && amount <= currency.max_amount;
  }

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
      setAmount((e.target.value));
  
  };
  const handleSetCurrencies = (e: ChangeEvent<HTMLInputElement>) => {
    const amount: number =Number(e.target.value);
    const data:CurrencyOption[]=currencies.filter((curr) => isAmountValid(amount, curr))
    setCurrency(data)
  };

  

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear pago</h1>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Importe a pagar</label>
            <input
              type="text"
              placeholder="Añade importe a pagar"
              value={amount}
              //onChange={(e) => setAmountLocal(e.target.value)}
              onChange={handleAmount}
              onBlur={handleSetCurrencies}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Seleccionar moneda <CiCircleInfo />
            </label>
            <Select               
                value={selectedCurrency} 
                onChange={handleCurrencyChange}
                options={currency}
                getOptionLabel={(e) => e.name} 
                formatOptionLabel={(e) => ( 
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={e.image} alt={e.name} style={{ width: 20, height: 20, marginRight: 10 }} />
                    {e.name}
                  </div>
                )}
                className={styles.select}
              />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Concepto</label>
            <input
              type="text"
              placeholder="Añada descripción del pago"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className={styles.input}
            />
          </div>

          <button
            type="button"
            className={`${styles.button} ${!isFormComplete ? styles.disabled : ''}`}
            disabled={!isFormComplete}
            onClick={handleCreateOrder}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}



