import React from 'react'

function Hero() {
  return (
    <>
    <div className=' bg-secondary-50 flex gap-8 items-center h-[400px]'>
     <img src="/src/assets/hero/hero1.png" className=' ' alt="" />
     <div>
        <p className='font-semibold text-[60px] text-neutral-200 '>Hot Deals</p>
        <p className='font-bold text-[60px] text-neutral-400'>70% off</p>
     </div>
    </div>
    </>
  )
}

export default Hero
