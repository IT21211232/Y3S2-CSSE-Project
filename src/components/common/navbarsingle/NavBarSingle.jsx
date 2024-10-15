import React from 'react'

import sampleImage from '../../../assets/icons/dashboard.svg'

export default function NavBarSingle() {
  return (
    <div className='w-full h-12 bg-purple-400 border-solid border-blue-200 border-2 flex items-center'>
      <div className='w-full h-auto bg-red-400 flex items-center'>
        <img className='ml-5 mr-2 size-4' src={sampleImage} alt="" />
        <h3>Tester</h3>
      </div>
    </div>
  )
}
