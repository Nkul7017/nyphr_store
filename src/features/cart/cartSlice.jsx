import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddToCart, DeleteCart, FetchCart, UpdateCart } from "./cartApi";

const initialState={
    item:[],
    status:"idle",
    error:null,
}

export const AddCartAsync=createAsyncThunk(
    'cart/addToCart',
    async(item,{rejectWithValue})=>{
        try {
            const response= AddToCart(item)
            return response;
        } catch (error) {
             return rejectWithValue(error.message)
        }
    }
)
export const FetchCartAsync=createAsyncThunk(
    'cart/fetchCart',
    async(user,{rejectWithValue})=>{
        // console.log(user)
        try {
            const response= FetchCart(user)
            return response;
        } catch (error) {
             return rejectWithValue(error.message)
        }
    }
)

export const UpdateCartAsync=createAsyncThunk(
    'cart/UpdateCart',
    async(user,{rejectWithValue})=>{
        console.log(user)
        try{
        const response=UpdateCart(user);
        return response; }
        catch(e){
            rejectWithValue(e.message);
        }
    }
)

export const DeleteCartAsync=createAsyncThunk(
    'cart/DeleteCart',
    async(user,{rejectWithValue})=>{
        console.log(user)
        try{
        const response=DeleteCart(user);
        return response; }
        catch(e){
            rejectWithValue(e.message);
        }
    }
)

export const CartSlice=createSlice({
 name:'cart',
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
builder
.addCase(AddCartAsync.pending,(state,action)=>{
    state.status="loading"
})
.addCase(AddCartAsync.fulfilled,(state,action)=>{
    state.status="idle";
    alert("Added to Cart")
    state.item.push(action.payload),
    state.error=null;
})
.addCase(AddCartAsync.rejected,(state,action)=>{
    state.status='idle',
    state.error=action.payload
})
.addCase(FetchCartAsync.pending,(state,action)=>{
    state.status="loading"
})
.addCase(FetchCartAsync.fulfilled,(state,action)=>{
    state.status="idle",
    // console.log(action.payload)
    state.item=action.payload,
    state.error=null;
})
.addCase(FetchCartAsync.rejected,(state,action)=>{
    state.status='idle',
    state.error=action.payload
})
.addCase(UpdateCartAsync.pending,(state,action)=>{
    state.status="loading"
})
.addCase(UpdateCartAsync.fulfilled, (state, action) => {
    state.status = "idle";
    let index = state.item.findIndex((value) => value?._id === action.payload?._id);
    if (index !== -1) {
        state.item[index].quantity = action.payload?.quantity;
    }
    state.error = null;
})
.addCase(UpdateCartAsync.rejected,(state,action)=>{
    state.status='idle',
    state.error=action.payload
})
.addCase(DeleteCartAsync.pending,(state,action)=>{
    state.status="loading"
})
.addCase(DeleteCartAsync.fulfilled, (state, action) => {
    state.status = "idle";
    state.item = state.item.filter((value) => value?._id !== action.payload?._id);
    state.error = null;
})
.addCase(DeleteCartAsync.rejected,(state,action)=>{
    state.status='idle',
    state.error=action.payload
})
 }

})

export const selectcart=(state)=>state.cart.item;

export default CartSlice.reducer;