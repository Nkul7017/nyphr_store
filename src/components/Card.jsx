import React from 'react'
import Rating from '@mui/material/Rating';
import { MdShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
function Card({data}) {
  return (
    <>
    <div className='w-[270px] p-2  space-y-1'>
        <div className='flex justify-between'>
        <span className=' bg-secondary-75 px-3 text-[12px] text-neutral-400 py-1 rounded-md'>{data?.discountPercentage}% off</span>
        <span className=' bg-primary-300 px-3 text-[12px] text-white py-1 rounded-md'>New</span>
        </div>
        <div>
            <img src={data?.thumbnail} className=' w-[100%] object-contain h-[200px]' alt="" />
        </div>
        <div>
            <span className='text-neutral-400 text-[14px] font-bold'>{data?.title}</span>
        </div>
        <div className=' flex items-center  '>
        <Rating name="half-rating-read" style={{color:"#24A57E"}}  defaultValue={data?.rating} precision={0.5} readOnly />
        <span className=' text-[12px]'>(25)</span>
        </div>
        <div className=' flex gap-2   '>
         <span className='text-[12px] line-through     mb-[1px]  self-end  text-neutral-200 font-semibold'>₹{data?.price}</span>
         <span className='text-[16px]   text-neutral-400 font-bold'>₹{data?.discountPrice}</span>
        </div>
        <div>
        <Link to={`/details/${data?._id}`}  className=' grid place-content-center bg-primary-300  w-[126px] h-[36px] text-white rounded-md'><MdShoppingCart size={20} />
</Link>
        </div>
        
    </div>
    </>
  )
}

export default Card
