"use client";

import FailureMessage from "@/cripto/ui/PaymentMessage/FailureMessage";
//import SuccessMessage from "@/cripto/ui/PaymentMessage/SuccessMessage";


export default function Page() {
    return (
        <div >
            <FailureMessage/>
            {/* <SuccessMessage/> */}
        </div>
    );
}