import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { fetchProductsByIdAsync, selectAllProducts } from '../productSlice'
import Rating from '@mui/material/Rating';
import Free from '../../../components/Free';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { AddCartAsync, selectcart } from '../../cart/cartSlice';
import { userinfo } from '../../user/userSlice';

function ProductDetails() {
  const {pathname}=useLocation();
  useEffect(()=>{
   scrollTo(0,0)
  },[pathname])
  const [toggle,setToggle]=useState(0);
  const [index,setIndex]=useState(0);
  const [index1,setIndex1]=useState(0);
  const {_id}=useParams()
  const product=useSelector(selectAllProducts);
  const user=useSelector(selectLoggedInUser)
  const user1=useSelector(userinfo);
  const cart=useSelector(selectcart)
  const dispatch=useDispatch()
  // console.log(product)
  console.log(cart)
  useEffect(()=>{
    dispatch(fetchProductsByIdAsync(_id));
  },[])

  function handlecart()
  {
    if(cart?.findIndex(value=>value?.product?._id===product?._id)<0)
   { const newItem={
      product:product._id,
      quantity:1,
      size:product?.sizes[index1],
      color:product?.color[index],
      user:user1?._id
    }
    console.log(newItem)
    dispatch(AddCartAsync(newItem))
  }
  else{
    alert("already added")
  }
  }
  return (
    <>
    <div className=' mt-[5vh] mb-[3vh] py-[5vh] bg-[#F6F9FF] w-[90vw] mx-auto grid lg:grid-cols-2'>
   <div className='flex gap-3 p-2'>
   <div className=' flex justify-center flex-col gap-3'>
    {product?.images?.map((value,i)=>
      <button onClick={()=>setToggle(i)} className='rounded-lg p-2 bg-white'><img src={value} className='object-contain w-[80px] h-[80px] ' alt="" /></button>
      )}
   </div>
   <div className='  bg-white h-[70vh] flex items-center justify-center  flex-1'>
    <img className='    object-contain h-[300px] w-[300px]' src={product?.images && product?.images[toggle]} alt="" />
   </div>
   </div>
   <div className=' flex justify-center items-center '>
   <div>
   <p className='text-[32px] font-bold text-primary-300'>{product?.title}</p>
   <p className='text-[#066882] text-[16px] font-semibold'>{product?.description}</p>
   <div className=' mt-[1vh]'>
   <Rating size='large'  name="half-rating-read" style={{color:"#20B8E1"}}  defaultValue={4.3}
  precision={0.1}  readOnly />
   </div>
   <div className=' flex gap-4 mt-[2vh]'>
   {product?.color?.map((value,i)=>
   <button onClick={()=>(setIndex(i))} className={`h-5 w-5 shadow-md  ${index===i&&"outline-offset-2 outline-neutral-200  outline outline-1"}  rounded-full `}
   style={{backgroundColor:`${value}`}}
   ></button>
   )}
   </div>
   <div className=' flex gap-4 mt-[3vh]'>
    {product?.sizes?.map((value,i)=>
    <button onClick={()=>setIndex1(i)} className={`w-[102px] h-[51px]    text-[#066882] rounded-md ${index1!==i&&"bg-white"}  border border-[#20B8E1] `}>{value}GB</button>
      )}
   </div>
   <p className='text-[32px] mt-[2vh] font-bold text-[#066882]'>₹{product?.discountPrice} <span className='  line-through text-[16px]'>₹{product?.price}</span></p>
   {user?.loggedInUserToken?<button  onClick={handlecart}   className=' mt-[2vh]  bg-primary-300  w-[126px] h-[36px] text-white rounded-md'>Add To Cart
</button>:<Link  to='/login'  className=' mt-[2vh] grid place-content-center      w-[126px] h-[36px] text-white rounded-md'>Add To Cart
</Link>}
   </div>
  
   </div>
    </div>

<div className='w-[90vw] mt-[10vh] mx-auto'> <Free/>
</div>

    <div className='my-[10vh] w-[90vw] mx-auto '>
    <p className='text-primary-300 font-semibold  text-[24px]'>Highlights</p>
    <div className='mt-[4vh] space-y-2'>
      {product.highlights?.map(value=>
 <p className=' text-[16px] text-[#066882]'>-{value}</p>
     ) }
    </div>
    </div>
    </>
  )
}

export default ProductDetails
 