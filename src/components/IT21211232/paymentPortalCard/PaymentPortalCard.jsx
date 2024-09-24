import { useState } from 'react'
import { db } from '../../../config/firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function PaymentPortalCard({data}) {
  const {id, price} = data;
  const [paymentMethod, setPaymentMethod] = useState('visa')
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expirationMonth, setExpirationMonth] = useState('01')
  const [expirationYear, setExpirationYear] = useState('2020')
  const [securityCode, setSecurityCode] = useState('')

  const navigate = useNavigate();


// Function to update the 'status' field of a specific document by its ID
    async function updateStatusById() {
        try {
            // Reference to the document by ID
            const docRef = doc(db, "userSchedules", id);

            // Get the document to check the current status
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Check if the current status is false
                if (docSnap.data().status === false) {
                    // Update the status to true
                    await updateDoc(docRef, {
                        status: true
                    });
                    console.log(`Document with ID: ${id} status updated to true.`);
                    navigate('/user/payment')
                } else {
                    console.log(`Document with ID: ${id} already has status: true.`);
                }
            } else {
                console.log(`No such document with ID: ${id}`);
            }
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle payment submission logic here
    updateStatusById();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-500 rounded-full p-3">
            <CreditCard className="text-white w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">SECURE PAYMENT INFO</h2>
        <h2 className="text-2xl font-bold text-center mb-6">Rs. {data.price}</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio text-yellow-500"
                name="paymentMethod"
                value="visa"
                checked={paymentMethod === 'visa'}
                onChange={() => setPaymentMethod('visa')}
              />
              <span className="ml-2">Visa</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio text-primary_yellow"
                name="paymentMethod"
                value="mastercard"
                checked={paymentMethod === 'mastercard'}
                onChange={() => setPaymentMethod('mastercard')}
              />
              <span className="ml-2">Mastercard</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio text-yellow-500"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
              />
              <span className="ml-2">PayPal</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
              Name on card
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cardNumber">
              Card number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiration date</label>
            <div className="flex space-x-4">
              <select
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                value={expirationMonth}
                onChange={(e) => setExpirationMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month.toString().padStart(2, '0')}>
                    {month.toString().padStart(2, '0')} - {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
              <select
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                value={expirationYear}
                onChange={(e) => setExpirationYear(e.target.value)}
              >
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="securityCode">
              Security code
            </label>
            <input
              type="text"
              id="securityCode"
              className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="000"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            PAY NOW
          </button>
        </form>
      </div>
    </div>
  )
}