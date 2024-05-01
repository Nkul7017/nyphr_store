import axios from "axios";

export const signupUser=async(userdata)=>{
    try{
        const response=await axios.post('http://localhost:5000/api/auth/signup',userdata)
        if(response.status===201)
        return
    }
    catch(e)
    {
        console.log(e);
        if(e?.response?.status===400)
        throw new Error(e?.response?.data?.message)
        else 
        throw e
    }
}

export const loginUser=async(userdata)=>{
try {
    const response=await axios.post("http://localhost:5000/api/auth/login",userdata)
    if(response.status===200)
    {console.log(response?.data)
    return response?.data } 
} catch (e) {
    console.log(e);
    if(e?.response?.status===400)
    throw new Error(e?.response?.data?.message)
    else throw e
}
}

export const forgetUser=async(userdata)=>{
    try {
      const response=await axios.post("http://localhost:5000/api/auth/forget",userdata) 
      if(response.status===200)
      {
        return
      } 
    } catch (e) {
        console.log(e);
        if(e?.response?.status===400)
        throw new Error(e?.response?.data?.message)
    else throw e
    }
}

export const resetUser=async(userdata)=>{
    try {
        const response=await axios.post("http://localhost:5000/api/auth/reset",userdata)
        if(response.status===200)
        return
    } catch (e) {
        console.log(e);
        if(e?.response?.status===400)
        throw new Error(e?.response?.data?.message)
        else throw e
    }
}