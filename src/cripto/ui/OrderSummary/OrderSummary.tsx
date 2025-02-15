'use client';

import React, { useEffect } from 'react';
import styles from './OrderSummary.module.css';
import { LuClock3 } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { FiCopy } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { useStore } from '../../store/useStore';  
//import ServiceOrder from '../../services/orders/orders'
interface Props {
  identifier: string;
  
}
const OrderSummary = ({identifier}:Props) => {
  
  //Aqui emulamos datos con variables globales, ya que no podemos
  // tener un identifier real para acceder a la orden creada
  const { amountG, conceptG, selectedCurrencyG } = useStore(); 

  console.log("Estamos en OrderSumary")
  console.log("Mostrame la Props")
  console.log(identifier)

  console.log("Mostrame la variable globales")
  console.log("Importe:", amountG);
  console.log("Concepto:", conceptG);
  console.log("Moneda seleccionada:", selectedCurrencyG?.name);

//Creamos dos variables para emular, Comercio y fecha
const sale:string="Locos por el Asado";

const dateData = new Date();
const date:string=formatDate(dateData)

//Aqui deberiamos obtener los datos de la orden
//en funcion del identifier pasado por la props
// desde el ruteo dinamico
//
useEffect(() => {
    
/*   const fetchOrderList = async () => {
    const data = await ServiceOrder.getOrderListRead(identifier);

      console.log("Datos de la orden:", data); 
   
  };

  fetchOrderList(); */
}, []);

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}




//Armamos la pantalla con los datos emulados
//con variables globales
  return (
    <div className={styles.orderSummaryContainer}>
      <div className={styles.orderSummaryCard}>
        <h2>Resumen del Pedido</h2>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardName}>Importe: </span>
            <span className={styles.cardValue}>{amountG} EUR</span>
          </div>

          <div className={styles.cardHeader}>
            <span className={styles.cardName}>Moneda seleccionada:</span>
            <span className={styles.cardValue}>
              <img
                src={selectedCurrencyG?.image}
                alt={selectedCurrencyG?.name}
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              {selectedCurrencyG?.name}
            </span>
          </div>

          <div className={`${styles.cardHeader} ${styles.cardHeaderColumn}`}>
            <div className={styles.cardHeaderColumnRow}>
              <span className={styles.cardName}>Comercio:</span>
              <span className={styles.cardValue}>
                <MdOutlineVerified style={{ color: "skyblue", marginRight:'2px' }} />
                 {sale}
              </span>
            </div>

            <div className={styles.cardHeaderFecha}>
              <span className={styles.cardName}>Fecha:</span>
              
              <span className={styles.cardValue}> {date}</span>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.cardConcept}>Concepto: </span>
            <span className={styles.cardValue}>{conceptG}</span>
          </div>
        </div>
      </div>

      <div className={styles.paymentSection}>
        <h2>Realizar el Pago</h2>
        <div className={styles.paymentDetails}>
          <div className={styles.paymentField}>
            {/* Hora */}
            <p>
              <LuClock3 /> 10:24
            </p>
          </div>
          <div className={styles.paymentButtons}>
            <button className={styles.smartQRButton}>SmartQR</button>
            <button className={styles.web3Button}>Web3</button>
          </div>

          <div className={styles.centeredContent}>
            <div className={styles.QR}>
              qr
            </div>

            <div className={styles.infoSection}>
              <p className={styles.infoText}>
                Enviar: <FiCopy />
              </p>

              {/* el campo de la respuesta */}
              <p className={styles.infoText}>
                p4Lw2PtQgB7RmedTak143LrXp4Lw2PtQgB7RmedEV731CdTak143LrXp4L{" "}
                <FiCopy />
              </p>

              <p className={styles.infoText}>
                <CiCircleInfo className={styles.CiCircleInfo} /> Etiqueta de
                destinos: <FiCopy />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;






