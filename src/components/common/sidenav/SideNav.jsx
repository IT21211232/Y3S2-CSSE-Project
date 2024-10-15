import React, { useEffect, useState } from 'react'
import NavBarSingle from '../navbarsingle/NavBarSingle'

import {userNav} from '../../../utils/navbaroptions'

import dashboardimg from '../../../assets/icons/dashboard.svg'
import logoImageYellow from '../../../assets/logo/logoyellow.svg'

export default function SideNav({type}) {
  const [contentArr, setContentArr] = useState([]);
  useEffect(()=> {
    if(type === 'user'){
      setContentArr(userNav);
    }
  }, [])
  return (
    <div className='h-screen relative w-52 flex flex-col [box-shadow:0px_5px_20px_5px_rgba(0,0,0,0.6)] rounded-md'>
      {/* contains the logo */}
      <div className='flex flex-col items-center justify-center w-full h-36'>
        <img className='size-20' src={logoImageYellow} alt="" />
        <h1 className='text-2xl font-medium'><font className='text-primary_yellow'>Eco</font><font>Bin</font></h1>
      </div>
      {/*Contains individual links*/}
      <div className='links flex-1 w-full overflow-y-auto'>
        {
          contentArr.map((data, index)=> (
            <NavBarSingle key={index} data={data} position={index}/>
          ))
        }
      </div>
    </div>
  )
}
