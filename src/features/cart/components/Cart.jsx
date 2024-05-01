import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteCartAsync, UpdateCartAsync, selectcart } from '../cartSlice'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
Modal.setAppElement('#root');
function Cart() {
const [toggle,setToggle]=useState(false);

  const cart=  useSelector(selectcart)
  const dispatch=useDispatch();
  const totalAmount=cart.reduce((acc,cur)=>{
   return acc+cur?.product?.discountPrice*cur?.quantity
  },0)
  const totalItems=cart.reduce((acc,cur)=>{
   return acc+parseInt(cur?.quantity)
  },0)
  console.log(totalItems)

  async function handleQuantity(_id,e)
  {
   console.log(e.target.value);
  await  dispatch(UpdateCartAsync({_id:_id,quantity:e.target.value}));
  }

  async function handleDelete(_id)
  {
  await dispatch(DeleteCartAsync({_id:_id}));
  setToggle(false);
  }
  
  console.log(cart)
  return (
    <>
    <div className=' mb-[5vh] w-[90vw] mx-auto'>
      <h1 className='text-neutral-400 font-bold text-[36px]'>Cart</h1>
      {cart.map((value,index)=>
      <>
      <div className=' mt-7 flex justify-between'>
        <div className=' flex gap-2'>
          <div>
            <img className=' w-[100px] h-[100px]' src={value?.product?.thumbnail} alt="" />
          </div>
          <div className=' space-y-1'>
            <p className=' font-bold'>{value?.product?.title}</p>
            <p>{value?.product?.brand}</p>
            <div className=' flex items-center gap-2'>
              <p>Oty</p>
              <select value={value?.quantity} onChange={(e)=>handleQuantity(value?._id,e)} className=' border border-black px-2 py-1' >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
        <div className=' flex text-right flex-col justify-around'>
          <p className=' font-bold'>₹{value?.product?.discountPrice}</p>
          <button onClick={()=>setToggle(!toggle)}  className=' text-red-500 font-semibold '>Remove</button>
        </div>
      </div>
      <hr  className='border mt-2 border-neutral-300'/>
      <Modal
      isOpen={toggle}
      className="alert-modal"
        overlayClassName="overlay"
      onRequestClose={() => setToggle(false)}
      >
         <div className="alert-content text-black ">
         <h2 className=' font-semibold  text-[24px]'>Remove Item</h2>
          <p className=' mt-2 font-semibold'>Are you sure you want to remove this item from your cart?</p>
          <div className=' flex justify-center mt-5'>
            <div className=' space-x-5'>
            <button className=' text-primary-500' onClick={()=>handleDelete(value?._id)}>Yes</button>
            <button className=' text-green-500' onClick={()=>setToggle(false)}>No</button>
            </div>
          </div>
        </div>
      </Modal>
      </>
      )}
    </div>
    <div className='w-[90vw]  mx-auto flex justify-between'>
        <div className=' flex flex-col gap-1'>
         <p className=' text-[18px] font-semibold'>Subtotal</p>
         <p className=' text-[18px] font-semibold'>Total Items in Cart</p>
         <p className=' '>Shipping and taxes calculted at checkout</p>
        </div>
        <div className=' flex flex-col gap-1'>
         <p className=' text-right text-[18px] font-semibold'>₹ {totalAmount}</p>
         <p className='  text-right text-[18px] font-semibold'>{totalItems}</p>
        </div>
      </div>
   <div className=' w-[90vw] mx-auto  '>
      <button className=' rounded-md text-white py-2 my-5 bg-primary-300 w-[100%]'>Checkout</button>
      </div>
      <p className=' mb-[8vh] text-center'>or <Link to='/products' className="text-neutral-600 font-bold" >Continue Shopping</Link></p>
    </>
  )
}

export default Cart
