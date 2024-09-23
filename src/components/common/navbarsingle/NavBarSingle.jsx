import React from 'react'

import sampleImage from '../../../assets/icons/dashboard.svg'

export default function NavBarSingle({data, position}) {
  const {name, route, image} = data;
  
  return (
    <div className='w-full h-12 border-solid border-2 flex items-center justify-center'>
      <div className='w-[80%] h-10 bg-primary_yellow flex items-center rounded-md'>
        <img className='ml-4 mr-2 size-4' src={image} alt="" />
        <h3 className='text-[11px] font-semibold'>{name}</h3>
      </div>
    </div>
  )
}
