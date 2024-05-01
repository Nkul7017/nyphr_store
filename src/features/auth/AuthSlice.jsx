import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgetUser, loginUser, resetUser, signupUser } from "./AuthApi";

const initialState={
loggedInUserToken:localStorage.getItem("jwt")||null,
status:"idle",
error:null,
message:""
}

export const signupAsync=createAsyncThunk(
    'user/signup',
    async (userdata,{rejectWithValue})=>{
   try {
    const response=await signupUser(userdata);
    return response;
   } catch (error) {
    return rejectWithValue(error.message);
   }}
)

export const LoginAsync=createAsyncThunk(
    'user/login',
    async(userdata,{rejectWithValue})=>{
        console.log(userdata)
        try {
            const response=await loginUser(userdata);
            console.log(response);
            localStorage.setItem("jwt",response?.token)
            return response?.token
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    }
)

export const ForgetAsync=createAsyncThunk(
    'user/forget',
    async(userdata,{rejectWithValue})=>{
      try {
        const response=await forgetUser(userdata);
        return
      } catch (error) {
        return rejectWithValue(error.message)
      }
    }
)

export const ResetAsync=createAsyncThunk(
    'user/reset',
    async(userdata,{rejectWithValue})=>{
    try {
        const response=await resetUser(userdata)
        return
    } catch (error) {
        return rejectWithValue(error.message)
    }
    }
)

export const authSlice=createSlice({
name:'user',
initialState,
reducers:{
    resetmessage:(state)=>{
     state.message="";
    }
},
extraReducers:(builder)=>{
    builder
    .addCase(signupAsync.pending,(state)=>{
        state.status="loading";
        state.message="loading"
    })
    .addCase(signupAsync.fulfilled,(state,action)=>{
        state.status="idle";
        state.error=null;
        state.message="Signup Successfully"
        state.loggedInUserToken=action.payload;
    })
    .addCase(signupAsync.rejected,(state,action)=>{
        state.status="idle",
        state.message=action.payload
        state.error=action.payload
    })
    .addCase(LoginAsync.pending,(state,action)=>{
        state.status="loading"
        state.message="loading"
    })
    .addCase(LoginAsync.fulfilled,(state,action)=>{
     state.status="idle",
     state.error=null,
     state.message=""
     state.loggedInUserToken=action.payload
    })
    .addCase(LoginAsync.rejected,(state,action)=>{
     state.error=action.payload
     state.message=action.payload,
     state.status="idle"
    })
    .addCase(ForgetAsync.pending,(state,action)=>{
        state.status="loading"
        state.message="loading"
    })
    .addCase(ForgetAsync.fulfilled,(state,action)=>{
        state.status="idle"
        state.message="Mail Sent"
        state.error=null
    })
    .addCase(ForgetAsync.rejected,(state,action)=>{
        state.status="idle"
        state.message=action.payload
        state.error=action.payload
    })
    .addCase(ResetAsync.pending,(state,action)=>{
        state.status="loading"
        state.message="loading"
    })
    .addCase(ResetAsync.fulfilled,(state,action)=>{
        state.status="idle"
        state.message="Password Changes Successfully"
        state.error=null
    })
    .addCase(ResetAsync.rejected,(state,action)=>{
        state.status="idle"
        state.message=action.payload
        state.error=action.payload
    })
}
})

export const selectLoggedInUser=(state)=>state.auth;
export const {resetmessage}=authSlice.actions
export default authSlice.reducer