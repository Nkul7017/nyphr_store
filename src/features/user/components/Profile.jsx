import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateuserAsync, userinfo } from '../userSlice'
import { isphoneValid } from '../../../utils/phonevalidation';

function Profile() {
  const dispatch=useDispatch();
  let user=useSelector(userinfo);
  console.log(user);
  let [data2,setData2]=useState(user);
useEffect(() => {
  setData2(user); // Update data2 whenever user state changes
}, [user]);
  const initialState={
    name:"",
    city:"",
    state:"",
    pincode:"",
    phone:"",
    street:"",
    message:""
  }
  const [data,setData]=useState(initialState)
  
  const [toggle,setToggle]=useState(false)
  const [toggle1,setToggle1]=useState(false)
  const [i,setI]=useState(null)
  async function handlesubmit(e)
  {
    e.preventDefault();
    console.log(data)
    setData({...data,message:""})
e.preventDefault();
console.log(isphoneValid(data.phone))
if(data.name.trim().length>3 && data.city!=="" && data.state.trim()!=="" && data.street.trim()!=="" && isphoneValid(data.phone) && data.pincode.length===6  )
{
  await dispatch(updateuserAsync({...user,address:[...user.address,{
    name: data.name,
    phone: data.phone,
    street: data.street,
    city: data.city,
    state: data.state,
    pincode: data.pincode
  }]}));
   setData(initialState);
   setToggle(!toggle)

}
else{
  setData({...data,message:"* All fields are mandatory."})
}
  }
  async function handleupdate(e)
  {
    e.preventDefault()
    setToggle1(false);
    setI(null)
    await dispatch(updateuserAsync(data2));
}
  

  function handle(e)
  {
   setData({...data,[e.target.name]:e.target.value})
  }

   function handleedit(index){
    console.log(toggle1)
    if (toggle1 && index === i) {
      setToggle1(false);
      
  } else {

      setI(index);
      setToggle1(true);
    }
    setData2(user);
     }

     function handle1(i,e)
     {
      const updatedAddress = [...data2.address];
      updatedAddress[i] = { ...updatedAddress[i], [e.target.name]: e.target.value };
      setData2({ ...data2, address: updatedAddress });
     }

     async function handledelete(index){
      let updated=[...data2.address];
      updated.splice(index,1);
     data2={...data2,address:updated}
      await dispatch(updateuserAsync(data2));
     }

     

  return (
  <>
  <div className=' w-[90vw] mx-auto'>
  <p className=' text-primary-400 font-semibold  text-[20px] mt-[5vh] '>My Profile</p>
  <div className=' text-neutral-400 mt-[6vh]   pb-[10vhvh]   p-5 bg-secondary-50'>
   <div><p className=' text-[28px] font-semibold capitalize'>Username : <span>{user?.username}</span></p></div>
   <div><p className=' font-semibold '>Email : <span>{user?.email}</span></p></div>
  <hr className=' border-2 mt-2' />
  {!toggle&&<button  type="button" onClick={()=>setToggle(!toggle)} className='  text-[14px] w-[150px]  mt-3  bg-primary-300 rounded-md h-[40px] text-white font-semibold' >Add New Address</button>}
  
  {toggle&&<form  onSubmit={handlesubmit} className=' mb-[5vh] mt-[5vh] '>
    <p className=' text-[20px]  font-semibold'>Personal Information</p>
    <p className=' text-[14px]'>Use a payment address where you can recieve shipments.</p>

    <div className=' mt-[5vh] space-y-2'>
    <input type="text" name="name" value={data.name} onChange={handle}  placeholder='Full Name' className='px-[1vw]  placeholder:text-neutral-200 py-1  w-[80%] border border-neutral-200 ' />
    <input type="number" name='phone' value={data.phone} onChange={handle} placeholder='Phone' className='px-[1vw] py-1 placeholder:text-neutral-200 w-[30%] border border-neutral-200 ' />
    <input type="text" name='street' value={data.street} onChange={handle}   placeholder='Street Address' className='px-[1vw] py-1 placeholder:text-neutral-200 w-[100%] border border-neutral-200 ' />
    <div className=' grid gap-x-3 grid-cols-3'>
    <input type="city" name='city' value={data.city} onChange={handle}  placeholder='City' className='px-[1vw] py-1 placeholder:text-neutral-200 border border-neutral-200 ' />
    <input type="state" name='state' value={data.state} onChange={handle} placeholder='State/Province' className='px-[1vw] py-1 placeholder:text-neutral-200  border border-neutral-200 ' />
    <input  type="number" name='pincode' value={data.pincode} onChange={handle} placeholder='ZIP/Postal Code' className='px-[1vw] py-1 placeholder:text-neutral-200  border border-neutral-200 ' />
    </div>
    </div>
    <button  type="submit"  className='   text-[14px] w-[150px]  mt-3  bg-primary-300 rounded-md h-[40px] text-white font-semibold' >Add  Address</button>
    <button  onClick={()=>setToggle(!toggle)}  className=' ms-5  text-[14px]  mt-3   rounded-md h-[40px] text-neutral-400 font-semibold' >Cancel</button>
    <span className=' ms-2 text-[14px]'>{data.message}</span>
    </form>}
   
   {data2?.address?.map((item,index)=>
   <>
   <div className=' my-[3vh] p-2  border border-neutral-200 '>
  <div className='    grid grid-cols-3 justify-between'>
    <div>
      <p>Name : <span>{user?.address[index]&&user?.address[index]?.name}</span></p>
      <p>Phone : <span>{user?.address[index]&&user?.address[index]?.phone}</span></p>
      <p>Pincode : <span>{user?.address[index]&&user?.address[index]?.pincode}</span></p>
    </div>
    <div>
    <p>Sreet : <span>{user?.address[index]&&user?.address[index]?.street}</span></p>
    <p>City : <span>{user?.address[index]&&user?.address[index]?.city}</span></p>
    <p>State : <span>{user?.address[index]&&user?.address[index]?.state}</span></p>
    </div>
    <div className=' flex flex-col items-start '>
      <button onClick={()=>handleedit(index)}className='underline  underline-offset-2 '>Edit</button>
      <button onClick={()=>handledelete(index)} className='underline underline-offset-2 '>Remove</button>
    </div>
   
   </div>
   {toggle1&&(index===i)&&<form  onSubmit={handleupdate} className=' mb-[5vh] mt-[5vh] '>
    <p className=' text-[20px]  font-semibold'>Update Personal Information</p>
    <p className=' text-[14px]'>Use a payment address where you can recieve shipments.</p>

    <div className=' mt-[5vh] space-y-2'>
    <input type="text" name="name" value={item.name} onChange={(e)=>handle1(index,e)}  placeholder='Full Name' className='px-[1vw]  placeholder:text-neutral-200 py-1  w-[80%] border border-neutral-200 ' />
    <input type="number" name='phone' value={item.phone} onChange={(e)=>handle1(index,e)} placeholder='Phone' className='px-[1vw] py-1 placeholder:text-neutral-200 w-[30%] border border-neutral-200 ' />
    <input type="text" name='street' value={item.street} onChange={(e)=>handle1(index,e)}   placeholder='Street Address' className='px-[1vw] py-1 placeholder:text-neutral-200 w-[100%] border border-neutral-200 ' />
    <div className=' grid gap-x-3 grid-cols-3'>
    <input type="city" name='city' value={item.city} onChange={(e)=>handle1(index,e)}  placeholder='City' className='px-[1vw] py-1 placeholder:text-neutral-200 border border-neutral-200 ' />
    <input type="state" name='state' value={item.state} onChange={(e)=>handle1(index,e)} placeholder='State/Province' className='px-[1vw] py-1 placeholder:text-neutral-200  border border-neutral-200 ' />
    <input  type="number" name='pincode' value={item.pincode} onChange={(e)=>handle1(index,e)} placeholder='ZIP/Postal Code' className='px-[1vw] py-1 placeholder:text-neutral-200  border border-neutral-200 ' />
    </div>
    </div>
    <button  type="submit"  className='   text-[14px] w-[150px]  mt-3  bg-primary-300 rounded-md h-[40px] text-white font-semibold' >Update  Address</button>
    <span className=' ms-2 text-[14px]'>{data.message}</span>
    </form>}
   </div>
   </>
   )}



  </div>
  </div>
  </>
  )
}

export default Profile
