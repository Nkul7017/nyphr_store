import axios from "axios"


export const fetchProductByFilter=async(filter,sort,pagination)=>{

    console.log("hello")
    let query="";
    for(let key in filter)
    {
        query+=`${key}=${filter[key]}&`
    }
    for(let key in sort)
    {
        query+=`${key}=${sort[key]}&`
    }
    for(let key in pagination)
    {
        query+=`${key}=${pagination[key]}&`
    }

    console.log(query);
    try {
        const response=await axios.get(`http://localhost:5000/api/product?${query}`);
        console.log(response);
        if(response.status===200)
        {
            return response.data;
        }
    } catch (e) {
        console.log(e)
        if (e?.response?.status === 400) {
            throw new Error(e?.response?.data?.message);
        } else {
            throw e;
        }
    } 
}


export const fetchProductId=async(_id)=>{
  try {
    const response=await axios.get(`http://localhost:5000/api/product/${_id}`)
    if(response.status===200)
    return response.data;
  } catch (e) {
     if(e?.response?.status===400)
     throw new Error(e?.response?.data?.message)
    else throw e;
  }
}