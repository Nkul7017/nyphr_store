import React, { useEffect, useState } from 'react'
import { ResetAsync, resetmessage, selectLoggedInUser } from '../features/auth/AuthSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ResetPasswordPage() {
  const {token}=useParams();
  useEffect(()=>{
    return()=>{
    dispatch(resetmessage());
    }
    },[])
   const navigate=useNavigate();
    const initialState=  {
      password:"",
      cpassword:"",
      message:""
    }
    const [data,setData]=useState(initialState)
    
    const user=useSelector(selectLoggedInUser);
    console.log(user);
    const dispatch=useDispatch();
    async function handlesubmit(e)
    {
      setData({...data,message:""})
  e.preventDefault();
  if(data.password.trim().length>5 && data.cpassword.trim().length>5 )
  {
    if(data.password.trim()===data.cpassword.trim())
    {
    await dispatch(ResetAsync({password:data.password,token:token}));  
    setData(initialState) 
    }
    else{
      setData({...data,message:"password not matching."})
    }
  }
  else{
    setData({...data,message:"* Password must be at least 6 characters long."})
  }
    }
  
    function handle(e)
    {
     setData({...data,[e.target.name]:e.target.value})
    }
  return (
    <>
    <div className=' w-screen h-screen grid place-content-center bg-neutral-10'>
    <div className=' px-[3vw]     h-[80vh]  w-[90vw] sm:w-[436px]  bg-neutral-0 shadow-lg rounded-xl  '>
     <img src="/src/assets/logo/navbar_logo.png" className='mt-[6vh]' alt="" />
     <p className='text-[36px] text-neutral-400 mt-[3vh]  font-bold'>Reset your</p>
     <p className='text-[36px] text-neutral-400   font-bold'>Password</p>
     <form onSubmit={handlesubmit} className='space-y-10 mt-[5vh] '>
    <input  type="password" name='password' value={data.password} onChange={handle} placeholder='new password' className=' px-[1vw] py-1 text-[16px] placeholder:text-neutral-200  w-[100%] border-b border-neutral-200 ' />
    <input type="password" name="cpassword" value={data.cpassword} onChange={handle} placeholder='confirm new password' className=' px-[1vw] py-1 text-[16px] placeholder:text-neutral-200  w-[100%] border-b border-neutral-200 ' />
   
    <button disabled={user.status==="loading"}  type='submit' className='w-[100%] bg-primary-300 text-white h-[35px] rounded-lg font-semibold'>Reset Password</button>
     </form>
     <p className=' text-center  mt-1 '>{user?.message}</p>
    <p className=' text-center mt-1  '>{data?.message}</p>
     </div>
    </div>
    </>
  )
}

export default ResetPasswordPage
