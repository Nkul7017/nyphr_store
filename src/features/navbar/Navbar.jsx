import React, { useEffect } from 'react'
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLoggedInUser } from '../auth/AuthSlice';
import { userinfo } from '../user/userSlice';
import { selectcart } from '../cart/cartSlice';
function Navbar() {
 const user= useSelector(userinfo);
 const cart=useSelector(selectcart);

  return (
    <>
    <div className='w-[90vw] flex justify-between items-center mx-auto'>
      <div>
        <Link to="/"><img src="/src/assets/logo/navbar_logo.png" alt="" /></Link>
      </div> 
      {/* <div className=' flex-1 max-w-[557px] relative   '>
        <input type="text" placeholder='Search' className='ps-[2vw] placeholder:text-secondary-400 h-[36px] border w-[100%] rounded-md border-secondary-400 pe-[95px] ' />
        <button className=' absolute right-0  text-[12px] top-1/2 -translate-y-1/2 transform w-[89px]   bg-primary-300 rounded-md h-[100%] text-white font-semibold' >Search</button>
        </div> */}
        <div className=' flex gap-7  items-center '>
        {/* <FaHeart size={21} className='text-secondary-400' /> */}
        <Link to='/cart' className=' relative'>
    <div class="relative py-2">
  <div class="t-0 absolute left-3">
    <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{cart?.length}</p>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file: mt-4 h-6 w-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
</div>
</Link>
        {user?<Link to="/profile" className=' grid place-content-center mt-2  w-[89px] text-[12px]   bg-primary-300 rounded-md h-[30px] text-white font-semibold' ><span className=' capitalize'>
         {user?.username}</span></Link>:<Link to="/login" className=' grid place-content-center  w-[89px] text-[12px]   bg-primary-300 rounded-md h-[30px] text-white font-semibold' ><span>
          Login</span></Link>}
        </div>
    </div>
    </>
  )
}

export default Navbar
