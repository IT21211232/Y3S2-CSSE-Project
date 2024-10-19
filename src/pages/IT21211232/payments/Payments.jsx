import React, { useContext, useEffect, useState } from 'react'
import { GlobalDataContext } from '../../../context/globalData'
import { db } from '../../../config/firebase';
import { collection, getDocs } from "firebase/firestore" // imported from the firestore
import PaymentCard from '../../../components/IT21211232/paymentCard/PaymentCard';

export default function Payments() {
  const [totalWeight, setTotalWeight] = useState(0)
  const {setCurrentPageData} = useContext(GlobalDataContext)
  const [userSchedules, setUserSchedules] = useState([]);

  const [completedArr, setCompletedArr] = useState([]);
  const [incompletedArr, setIncompletedArr] = useState([]);

  const usersSchedulesRef = collection(db, "userSchedules")

  // fetch the user schedules
  const getUserSchedules = async () => {
    const data = await getDocs(usersSchedulesRef);
    setUserSchedules(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
  }

  useEffect(()=> {
    setCurrentPageData("Payments")

    getUserSchedules();
  }, [])

  useEffect(()=> {
    setCompletedArr(userSchedules.filter(item => item.status === true))
    setIncompletedArr(userSchedules.filter(item => item.status === false))
    
    let sum = 0;

    userSchedules.forEach((obj) => {
      if(obj.status === true){
        sum += obj.weight * 220;
      }
    });

    setTotalWeight(sum)
  }, [userSchedules])
  
  return (
    <div className='relative bg-gray-100 flex-1 h-full overflow-y-auto overflow-x-hidden'>
      <div className='w-full h-[350px] bg-white flex items-center justify-center'>
        <h1 className='text-[50px]'>Rs. <font className='text-gray-400'>{totalWeight}</font> </h1>
      </div>
      <div className='w-full h-auto flex'>
        <div className='w-[50%] h-auto flex flex-col items-center'>
          <div className='flex flex-col items-center'>
            <p className='text-md'>Incomplete</p>
          </div>
          {
            incompletedArr.map((data)=> (
              <PaymentCard data={data} version={1}/>
            ))
          }
        </div>
        <div className='w-[50%] h-auto flex flex-col items-center'>
          <div className='flex flex-col items-center'>
            <p>Complete</p>
          </div>
          {
            completedArr.map((data)=> (
              <PaymentCard data={data} version={2}/>
            ))
          }

        </div>
      </div>
    </div>
  )
}
