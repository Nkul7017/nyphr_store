import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginAsync, resetmessage, selectLoggedInUser,  } from '../AuthSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import isValidEmail from '../../../utils/emailvalidation';

function Login() {
  useEffect(()=>{
  return()=>{
  dispatch(resetmessage());
  }
  },[])
  const navigate=useNavigate();
  const initialState=  {
    email:"",
    password:"",
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
if(isValidEmail(data.email.trim()) &&data.password.trim().length>5)
{

  await dispatch(LoginAsync({email:data.email,password:data.password}));
   setData(initialState);
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
    <div className=' px-[3vw]     h-[80vh]  w-[90vw] sm:w-[436px]  bg-neutral-0 shadow-lg rounded-xl  '>
     <img src="/src/assets/logo/navbar_logo.png" className='mt-[6vh]' alt="" />
     <p className='text-[36px] text-neutral-400 mt-[3vh]  font-bold'>Sign in</p>
     <form className='space-y-8 mt-[5vh]' onSubmit={handlesubmit}>
    <input type="email" name='email' value={data.email} onChange={handle} placeholder='Email' className=' px-[1vw] py-1 text-[16px] placeholder:text-neutral-200  w-[100%] border-b border-neutral-200 ' />
    <input type="password" name='password' value={data.password} onChange={handle}  placeholder='Password' className='px-[1vw] py-1 placeholder:text-neutral-200 w-[100%] border-b border-neutral-200 ' />
<button disabled={user.status==="loading"} type='submit'  className='w-[100%] bg-primary-300 text-white h-[35px] rounded-lg font-semibold'>Sign In</button>
     </form>
     <Link to='/forget' className=' float-right clear-both text-[14px] text-neutral-200 text-right'>Forgot Password?</Link>
     <p className='texxt-[12px] text-neutral-200 mt-[6vh]'>Do not have an account yet?</p>
     <Link to='/signup'  className=' grid place-content-center  h-[35px] mt-[1vh] border border-primary-400 rounded-lg text-primary-400   font-semibold '>
      <span>Sign UP</span></Link>
     <p className='mt-1 text-center'>{user?.message}</p>
     <p className='mt-1 text-center'>{data?.message}</p>
    </div>
    </div>
    </>
  )
}

export default Login
