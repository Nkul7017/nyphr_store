import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, updateUser } from "./userApi";


const initialState={
    userinfo:null,
    status:"idle",
    error:null,
}



export const fetchuserAsync=createAsyncThunk(
'user/fetchuser',
async(userdata,{rejectWithValue})=>{
 try {
    const response=getUser(userdata)
    return response
 } catch (error) {
     return rejectWithValue(error.message)
 }
}
)

export const updateuserAsync=createAsyncThunk(
    'user/updateuser',
    async(userdata,{rejectWithValue})=>{
        console.log(userdata)
        try {
           const response= updateUser(userdata);

           return response 
        } catch (e) {
            rejectWithValue(e.message)
        }
    }
)

export const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
    builder
    .addCase(fetchuserAsync.pending,(state,action)=>{
      state.status="loading"
      
    })
    .addCase(fetchuserAsync.fulfilled,(state,action)=>{
        state.status="idle"
        state.userinfo=action.payload
        state.error=null
    })
    .addCase(fetchuserAsync.rejected,(state,action)=>{
        state.status="idle"
        state.error=action.payload
    })
    .addCase(updateuserAsync.pending,(state,action)=>{
        state.status="loading"
    })
    .addCase(updateuserAsync.fulfilled,(state,action)=>{
        state.status="idle"
        state.error=null
        state.userinfo=action.payload
    })
    .addCase(updateuserAsync.rejected,(state,action)=>{
        state.status="idle"
        state.error=action.payload
    })
    }
})

export const userinfo=(state)=>state.user.userinfo;

export default UserSlice.reducer;