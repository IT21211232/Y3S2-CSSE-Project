import React from 'react'

import sampleImage from '../../../assets/icons/dashboard.svg'

export default function NavBarSingle() {
  return (
    <div className='w-full h-12 bg-purple-400 border-solid border-blue-200 border-2 flex items-center justify-center'>
      <div className='w-[80%] h-10 bg-red-400 flex items-center rounded-md'>
        <img className='ml-5 mr-2 size-4 filter yellow_filter' src={sampleImage} alt="" />
        <h3>Tester</h3>
      </div>
    </div>
  )
}
