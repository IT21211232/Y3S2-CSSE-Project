import React from 'react'
import { useLocation } from 'react-router-dom'
import PaymentPortalCard from '../../../components/IT21211232/paymentPortalCard/PaymentPortalCard'

export default function PaymentPortal() {
    const location = useLocation();
    const data = location.state;

    console.log(data.price);
    
  return (
    <div className="flex relative justify-center items-center bg-gray-100 flex-1 h-full overflow-y-auto overflow-x-hidden">
      <PaymentPortalCard data={data}/>
    </div>
  )
}
