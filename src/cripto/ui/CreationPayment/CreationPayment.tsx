'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CiCircleInfo } from "react-icons/ci";
import Select from 'react-select';
import styles from './CreationPayment.module.css';
import Service from '../../services/currency/currency';
import { useStore } from '../../store/useStore';

interface CurrencyOption {
  value: string;
  name: string;
  image: string;
}

export default function CreatePayment() {
  const router = useRouter();

  // Estados locales
  const [amount, setAmountLocal] = useState('');
  const [concept, setConceptLocal] = useState('');
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [selectedCurrency, setSelectedCurrencyLocal] = useState<CurrencyOption | null>(null);

  // Estado global con nombres distintos para evitar conflictos
  const { 
    setAmount: setGlobalAmount, 
    setConcept: setGlobalConcept, 
    setSelectedCurrency: setGlobalSelectedCurrency 
  } = useStore();

  // Validar si el formulario está completo
  const isFormComplete = selectedCurrency && amount && Number(amount) > 0 && concept;

  // Obtener lista de monedas desde el servicio
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data: CurrencyOption[] = await Service.getListCurrency();

        console.log("Lista de monedas disponibles:", data);

        if (data) {
          const formattedCurrencies = data.map((c) => ({
            value: c.value,
            name: c.name,
            image: c.image,
          }));
          setCurrencies(formattedCurrencies);
        }
      } catch (error) {
        console.error("Error al obtener las monedas:", error);
      }
    };

    fetchCurrencies();
  }, []);

  // Sincronizar estados locales con Zustand
  useEffect(() => {
    setGlobalAmount(amount);
    setGlobalConcept(concept);
    if (selectedCurrency) {
      setGlobalSelectedCurrency(selectedCurrency);
    }
  }, [amount, concept, selectedCurrency, setGlobalAmount, setGlobalConcept, setGlobalSelectedCurrency]);

  // Manejar cambio de moneda seleccionada
  const handleCurrencyChange = (selectedOption: CurrencyOption | null) => {
    setSelectedCurrencyLocal(selectedOption);
  };

  const handleBack = () => {
    console.log("Información del formulario:");
    console.log("Importe:", amount);
    console.log("Concepto:", concept);
    console.log("Moneda seleccionada:", selectedCurrency);

    router.push('/payment');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear pago</h1>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Importe a pagar</label>
            <input
              type="number"
              placeholder="Añade importe a pagar"
              value={amount}
              onChange={(e) => setAmountLocal(e.target.value)}
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
                options={currencies}
                getOptionLabel={(e) => e.name} // Asegurar que devuelve un string
                formatOptionLabel={(e) => ( // Formatear la opción con JSX
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
              onChange={(e) => setConceptLocal(e.target.value)}
              className={styles.input}
            />
          </div>

          <button
            type="button"
            className={`${styles.button} ${!isFormComplete ? styles.disabled : ''}`}
            disabled={!isFormComplete}
            onClick={handleBack}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}







