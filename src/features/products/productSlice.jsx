import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  fetchProductByFilter, fetchProductId } from "./productApi";

const initialState={
    products:[],
    totalproducts:0,
    status:"idle",
    error:null
}


export const fetchProductByFilterAsync=createAsyncThunk(
     'product/fetchProductFilter',
     async({filter,sort,pagination},{rejectWithValue})=>{
        console.log("hllo")
try {
    console.log(filter,sort,pagination)
    const response=await fetchProductByFilter(filter,sort,pagination);
    console.log(response)
    return response;
} catch (error) {
    console.log(error)
    return rejectWithValue(error.message)
}
     }
)

export const fetchProductsByIdAsync=createAsyncThunk(
    'product/fetchProductById',
    async(_id,{rejectWithValue})=>{
        try {
           const response=fetchProductId(_id);
           return response;  
        } catch (error) {
            rejectWithValue(error);
        }
    }
)

export const ProductSlice=createSlice({
    name:'product',
     initialState,
     reducers:{},
     extraReducers:(builder)=>{
     builder
     .addCase(fetchProductByFilterAsync.pending,(state,action)=>{
        state.status="loading"
     })
     .addCase(fetchProductByFilterAsync.fulfilled,(state,action)=>{
        state.status="idle"
        state.products=action.payload?.product
        state.totalproducts=action.payload?.total
        state.error=null
     })
     .addCase(fetchProductByFilterAsync.rejected,(state,action)=>{
        state.status="idle"
        state.error=action.payload
     })
     .addCase(fetchProductsByIdAsync.pending,(state,action)=>{
        
        state.status="loading";
     })
     .addCase(fetchProductsByIdAsync.fulfilled,(state,action)=>{
        state.status="idle";
        state.error=null;
        state.products=action.payload;
     })
     .addCase(fetchProductsByIdAsync.rejected,(state,action)=>{

        state.status="idle";
        state.error=action.payload;
     })
     }
})

export const selectAllProducts = (state) => state.product?.products;
export const selectTotalProducts = (state) => state.product?.totalproducts;

export default ProductSlice.reducer;