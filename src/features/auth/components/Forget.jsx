import React, { useEffect, useState } from 'react'
import { ForgetAsync, resetmessage, selectLoggedInUser } from '../AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import isValidEmail from '../../../utils/emailvalidation';

function Forget() {
    
    useEffect(()=>{
        return()=>{
        dispatch(resetmessage());
        }
        },[])
       const navigate=useNavigate();
        const initialState=  {
          email:"",
          username:"",
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
      if(isValidEmail(data.email.trim()) )
      {
        await dispatch(ForgetAsync({email:data.email}));  
        setData(initialState) 
      }
      else{
        setData({...data,message:"* All fields are mandatory."})
      }
        }
      
        function handle(e)
        {
         setData({...data,[e.target.name]:e.target.value})
        }
    
  return (
    <>
    {user?.loggedInUserToken&&<Navigate to='/' replace={true} />}
    <div className=' w-screen h-screen grid place-content-center bg-neutral-10'>
    <div className=' px-[3vw]     h-[60vh]  w-[90vw] sm:w-[436px]  bg-neutral-0 shadow-lg rounded-xl  '>
     <img src="/src/assets/logo/navbar_logo.png" className='mt-[6vh]' alt="" />
     <p className='text-[36px] text-neutral-400 mt-[3vh]  font-bold'>Forget Password</p>
     <form onSubmit={handlesubmit} className='space-y-8 mt-[5vh] '>
    <input type="email" name='email' value={data.email} onChange={handle} placeholder='Email' className=' px-[1vw] py-1 text-[16px] placeholder:text-neutral-200  w-[100%] border-b border-neutral-200 ' />
    <button disabled={user.status==="loading"} type='submit'  className='w-[100%] bg-primary-300 text-white h-[35px] rounded-lg font-semibold'>Submit</button>
     </form>
    <p className=' text-center mt-1 '>{user?.message}</p>
    <p className=' text-center mt-1 '>{data?.message}</p>
     </div>
    </div>
    </>
  )
}

export default Forget
