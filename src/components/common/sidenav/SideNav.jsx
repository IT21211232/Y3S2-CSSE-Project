import React from 'react'
import NavBarSingle from '../navbarsingle/NavBarSingle'

import dashboardimg from '../../../assets/icons/dashboard.svg'
import logoImageYellow from '../../../assets/logo/logoyellow.svg'

export default function SideNav() {
  const optionsCon = [
    {
      name: 'Dashboard',
      
    }
  ]
  return (
    <div className='h-screen w-52 flex flex-col'>
      {/* contains the logo */}
      <div className='flex flex-col items-center justify-center w-full h-36'>
        <img className='size-20' src={logoImageYellow} alt="" />
        <h1 className='text-2xl '><font className='text-primary_yellow'>Eco</font><font>Bin</font></h1>
      </div>
      {/*Contains individual links*/}
      <div className='links flex-1 w-full bg-pink-100 overflow-y-auto'>
        <NavBarSingle/>
        <NavBarSingle/>
        <NavBarSingle/>
        <NavBarSingle/>
        <NavBarSingle/>
      </div>
    </div>
  )
}
