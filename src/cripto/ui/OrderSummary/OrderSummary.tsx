'use client';

import React from 'react';
import styles from './OrderSummary.module.css';
import { LuClock3 } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { FiCopy } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { useStore } from '../../store/useStore';  

const OrderSummary = () => {
  const { amount, concept, selectedCurrency } = useStore(); 



  return (
    <div className={styles.orderSummaryContainer}>
      <div className={styles.orderSummaryCard}>
        <h2>Resumen del Pedido</h2>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardName}>Importe: </span>
            <span className={styles.cardValue}>{amount} EUR</span>
          </div>

          <div className={styles.cardHeader}>
            <span className={styles.cardName}>Moneda seleccionada:</span>
            <span className={styles.cardValue}>
              <img
                src={selectedCurrency?.image}
                alt={selectedCurrency?.name}
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              {selectedCurrency?.name}
            </span>
          </div>

          <div className={`${styles.cardHeader} ${styles.cardHeaderColumn}`}>
            <div className={styles.cardHeaderColumnRow}>
              <span className={styles.cardName}>Comercio:</span>
              <span className={styles.cardValue}>
                <MdOutlineVerified style={{ color: "skyblue", marginRight:'2px' }} />
                 -
              </span>
            </div>

            <div className={styles.cardHeaderFecha}>
              <span className={styles.cardName}>Fecha:</span>
              
              <span className={styles.cardValue}> -</span>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.cardConcept}>Concepto: </span>
            <span className={styles.cardValue}>{concept}</span>
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






