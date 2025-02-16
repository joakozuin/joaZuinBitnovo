'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './OrderSummary.module.css';
import { LuClock3 } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { FiCopy } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { useStore } from '../../store/useStore';  
import Web3 from 'web3';

//import ServiceOrder from '../../services/orders/orders'
interface Props {
  identifier: string;
  
}


const OrderSummary = ({identifier}:Props) => {

  const router = useRouter();

  const [status, setStatus] = useState<string>('');
  const [qr, setQr]= useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>('');


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
const sale:string="Travel Rock Mendoza";

const dateData = new Date();
const date:string=formatDate(dateData)

//Aqui deberiamos obtener los datos de la orden
//en funcion del identifier pasado por la props
// desde el ruteo dinamico
//
//
useEffect(() => {
    
 /*  const fetchOrderRead = async () => {
    const data = await ServiceOrder.getOrderListRead(identifier);

      console.log("Datos de la orden:", data); 
   
  }; */

  const handleWebSocket = () => {

      const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/${identifier}`);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setStatus(data.status);

       //Suponemos que el socket contiene informacion
       // del tiempo de expiracion del pago o del estado del pago
       //no conocemos la funcionalidades el socket

        if (data.status === 'EX' || data.status === 'OC') {
          
          router.push('/payment/message/failuremessage');
          
        } else if (data.status === 'CO' || data.status === 'AC') {
        
          router.push('/payment/message/successmessage');

        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error', error);
      };

      return () => {
        socket.close();
      };
    };

   //Aca deberiamos leer los datos de la orden de pago con el identifier
   //pero no funciona los endpoint, entonces emulamos datos
   //***** */

   //fetchOrderRead(); 

  handleWebSocket();

}, [status]);


 /* useEffect(() =>{
  const handleMetamask = async() => {

    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3Instance);
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error en la conexión a Metamask', error);
      }
    } else {
      alert('Instale Metamask para esta funcionalidad');
    }

  }

  //Conexión a Metamask
  //
  handleMetamask()
},[])  */


function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const qrData = `{"amount": ${amountG}, "currency": "${selectedCurrencyG?.name}", "address": "Xp4Lw2PtQgB7RmedTak143LrXp4Lw2PtQgB7RmedEV731CdTak143LrXp4L", "destinationTag": "2557164061"}`;

//Cuando apretamos el boton SmartQR
//generamos el pago utilizando la aplicacion
//de test de BTC, el codigo QR es generado
//con qrData
const handleSmartQR = async() => {

  setLoading(true);
  setQr(true)

  try {
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amountG)}), 
    });

    const data = await response.json();

    if (data.checkoutLink) {

      window.location.href = data.checkoutLink;

      router.push('/payment/message/successmessage');

    } else {

      router.push('/payment/message/failuremessage');

    }
  } catch (error) {
    console.error("Error:", error);

     router.push('/payment/message/failuremessage');

  } finally {
    setLoading(false);
  }
  

}

//Generando el pago usando wallet Metamask
//
const handleWeb3 = async() => {
 setQr(false)

 if (web3 && account) {
      try {
        await web3.eth.sendTransaction({
          from: account,
          to: 'peperodriguez@gmail.com', // Va la dirección del destinatario
          value: web3.utils.toWei(amountG, 'ether')
        });
      
        router.push('/payment/message/successmessage');

      } catch (err) {
        console.error(err);
      
        router.push('/payment/message/failuremessage');
      }
    }

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
                <MdOutlineVerified
                  style={{ color: "skyblue", marginRight: "2px" }}
                />
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
            <button
              className={styles.smartQRButton}
              onClick={() => handleSmartQR()}
            >
              {loading ? "Procesando..." : "SmartQR"}
            </button>

            <button className={styles.web3Button}
             onClick={() => handleWeb3()}>
              Web3
            </button>
            {account && <p>Conectado a la cuenta: {account}</p>}
          </div>

          <div className={styles.centeredContent}>
            <div className={styles.QR}>
              {qr ? (
                <QRCodeCanvas value={qrData} />
              ) : (
                <>
                  <img
                    src="/metamask.png"
                    alt={selectedCurrencyG?.name}
                    style={{ width: 140, height: 140}}
                  />
                </>
              )}
            </div>

            <div className={styles.infoSection}>
              <p className={styles.infoText}>
                Enviar: {amountG} {selectedCurrencyG?.name} <FiCopy />
              </p>

              {/* el campo de la respuesta */}
              <p className={styles.infoText}>
                p4Lw2PtQgB7RmedTak143LrXp4Lw2PtQgB7RmedEV731CdTak143LrXp4L{" "}
                <FiCopy />
              </p>

              <p className={styles.infoText}>
                <CiCircleInfo style={{ color: "yellow" }} /> Etiqueta de
                destino:2557164061 <FiCopy />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;






