import React from 'react'
import NavBarSingle from '../navbarsingle/NavBarSingle'

import dashboardimg from '../../../assets/icons/dashboard.svg'

export default function SideNav() {
  const optionsCon = [
    {
      name: 'Dashboard',
      
    }
  ]
  return (
    <div className='bg-green-300 h-screen w-52 flex flex-col'>
      {/* contains the logo */}
      <div className='w-full h-36 bg-blue-300'></div>
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
