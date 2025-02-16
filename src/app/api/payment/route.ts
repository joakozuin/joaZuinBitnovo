import  { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BTCPAY_URL = process.env.NEXT_PUBLIC_BTCPAY_URL!;
const API_KEY = process.env.NEXT_PUBLIC_BTCPAY_API_KEY!;
const STORE_ID = process.env.NEXT_PUBLIC_BTCPAY_STORE_ID!;


export async function POST(req: NextRequest) {
  
  try {
    const { amount } = await req.json();

    console.log("Estamos dentro del POST ruta api/payment")
    console.log(amount)

    const url=`${BTCPAY_URL}/api/v1/stores/${STORE_ID}/invoices`

    console.log("UrlLocal")
    console.log(url)

    const response = await axios.post(
      url,
      {
        amount,
        currency: "EUR",
        checkout: {
          speedPolicy: "MediumSpeed",
          //redirectURL: "http://localhost:3000/payment/message/successmassage",
        },
      },
      {
        headers: {
          Authorization: `token ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ checkoutLink: response.data.checkoutLink });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    return NextResponse.json({ error: "Error en la pasarela de pago" }, { status: 500 });
  }
}