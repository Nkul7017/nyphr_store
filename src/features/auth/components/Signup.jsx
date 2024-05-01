import React, { useEffect, useState } from 'react'
import { resetmessage, selectLoggedInUser, signupAsync } from '../AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import isValidEmail from '../../../utils/emailvalidation';
import { Link, Navigate, useNavigate } from 'react-router-dom';


function Signup() {
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
if(isValidEmail(data.email.trim()) && data.username.trim().length>3 && data.password.trim().length>5 && data.cpassword.trim().length>5 )
{
  if(data.password.trim()===data.cpassword.trim())
  {
  await dispatch(signupAsync({email:data.email,username:data.username,password:data.password}));   
  }
  else{
    setData({...data,message:"password not matching."})
  }
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
   {user?.loggedInUserToken&&<Navigate to='/' replace={true}/>} 
   <div className=' w-screen h-screen grid place-content-center bg-neutral-10'>
    <div className=' px-[3vw]     h-[85vh]  w-[90vw] sm:w-[436px]  bg-neutral-0 shadow-lg rounded-xl  '>
     <img src="/src/assets/logo/navbar_logo.png" className='mt-[6vh]' alt="" />
     <p className='text-[36px] text-neutral-400 mt-[3vh]  font-bold'>Sign up</p>
     <form onSubmit={handlesubmit} className='space-y-8 mt-[5vh] '>
    <input type="email" name='email' value={data.email} onChange={handle} placeholder='Email' className=' px-[1vw] py-1 text-[16px] placeholder:text-neutral-200  w-[100%] border-b border-neutral-200 ' />
    <input type="text" name="username" value={data.username} onChange={handle} placeholder='Username' className=' px-[1vw] py-1 text-[16px] placeholder:text-neutral-200  w-[100%] border-b border-neutral-200 ' />
    <input type="password" name='password' value={data.password} onChange={handle} placeholder='Password' className=' px-[1vw] py-1 text-[16px] placeholder:text-neutral-200  w-[100%] border-b border-neutral-200 ' />
    <input type="password" name="cpassword" value={data.cpassword} onChange={handle} placeholder='Confirm Password' className=' px-[1vw] py-1 text-[16px] placeholder:text-neutral-200  w-[100%] border-b border-neutral-200 ' />
    <button disabled={user.status==="loading"} type='submit'  className='w-[100%] bg-primary-300 text-white h-[35px] rounded-lg font-semibold'>Sign Up</button>
     </form>
    <p className=' text-center  mt-1 '>{user?.message}</p>
    <p className=' text-center mt-1  '>{data?.message}</p>
    <div>
      <p className='text-center'>Already a member? <Link to='/login' className=' text-[18px] mt-1 text-neutral-400 font-bold'>Login</Link> </p>
    </div>
     </div>
    </div>
    </>
  )
}

export default Signup
