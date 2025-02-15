'use client'
import { use } from "react";
//import OrderSummary from "@/cripto/ui/OrderSummary/OrderSummary";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const unwrappedParams = use(params);

  console.log("Ruteando a OrderSummary id:", unwrappedParams.id);

  return (
    <div>
          {/*<OrderSummary
           
           identifier={unwrappedParams.id}
              /> */}
    </div>
  );
};

export default Page;