import axios from "axios";

export const getUser=async(userdata)=>{

try {
    const response=await axios.post("http://localhost:5000/api/user/fetchuser",userdata)
    if(response.status===200){
       
    return response.data;

    }
} catch (e) {
    if(e?.response?.status===400)
    throw new Error(e?.response?.data?.message)
else 
throw e
}
}

export const updateUser=async(userdata)=>{
    try {
        const response= await axios.put(`http://localhost:5000/api/user/updateuser/${userdata?._id}`,userdata);
        if(response.status===200)
        {
            console.log(response)
            return response.data
        }
    } catch (e) {
        console.log(e)
         if(e?.response?.status===400)
         throw new Error(e?.response?.data?.message)
        else throw e
    }
}