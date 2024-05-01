import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

function Protected({children}) {
    const user=useSelector(selectLoggedInUser)
    console.log(user);
  return (
    <>
    {!user?.loggedInUserToken&&<Navigate to='/login' replace={true}/>}
    {children}
    </>
  )
}

export default Protected
