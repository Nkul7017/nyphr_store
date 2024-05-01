import axios from "axios"

export const AddToCart=async(item)=>{
 try {
     const response=await axios.post(`http://localhost:5000/api/cart`,item);
     if(response.status===201)
     {
      console.log(response.data);
    
        return response.data;
     }
 } 
 catch (error) {
    console.log(error)
    throw error;
 }
}
export const FetchCart=async(user)=>{
 try {
   // console.log(user);
     const response=await axios.get(`http://localhost:5000/api/cart/${user?.user}`);
   //   console.log(response);
     if(response.status===200)
     {
      //   console.log(response.data);
        return response.data;
     }
 } 
 catch (error) {
    console.log(error)
    throw error;
 }
}

export const UpdateCart=async(user)=>{
 try {
   console.log(user);
     const response=await axios.patch(`http://localhost:5000/api/cart/${user?._id}`,{quantity:user?.quantity});
   //   console.log(response);
     if(response.status===200)
     {
      //   console.log(response.data);
        return user;
     }
 } 
 catch (error) {
    console.log(error)
    throw error;
 }
}

export const DeleteCart=async(user)=>{
 try {
   console.log(user);
     const response=await axios.delete(`http://localhost:5000/api/cart/${user?._id}`);
   //   console.log(response);
     if(response.status===200)
     {
      //   console.log(response.data);
        return user;
     }
 } 
 catch (error) {
    console.log(error)
    throw error;
 }
}

