import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    user: JSON.parse(localStorage.getItem("user")) ||  null,
    token: JSON.parse(localStorage.getItem("jwtToken")) ||  null,
    isLoading: false,
    error: null
}

export const handleSignInUser = createAsyncThunk(
    'auth/signInUser',
    async ( credentials , thunkAPI) => {
        try {

            console.log("Received Credential In Handle Log In ==> ") ;
            console.log(credentials);
            const response = await axios
              .post(`${import.meta.env.VITE_API_GATEWAY_BASE_URL}/auth/signin`, credentials)
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to log in');
        }
    }
);


export const handleSignUpUser = createAsyncThunk(
    'auth/signUpUser',
    async ( credentials , thunkAPI) => {
        try {

            console.log("Received User credentials In Handle Sign Up ==> ") ;
            console.log(credentials);
            const response = await axios
              .post(`${import.meta.env.VITE_API_GATEWAY_BASE_URL}/auth/signup`, credentials)
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to sign up');
        }
    }
);



const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       handleLogOut:(state ) => {
        console.log("Here");
        
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.error = null;
            localStorage.removeItem("user");
            localStorage.removeItem("jwtToken") ;
            localStorage.removeItem("authToken") ;
            localStorage.removeItem("monitoredApi") ;
            localStorage.removeItem("userData") ;
       }
    } ,
    extraReducers: (builder) => {
        builder
        .addCase(handleSignInUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(handleSignInUser.fulfilled, (state, action) => {
            console.log("Sign In Action ==> ");
            console.log(action);
            state.isLoading = false;
            state.user = action.payload;
            state.token = action.payload.jwtToken;
            localStorage.setItem("user",JSON.stringify(action.payload))
            localStorage.setItem("jwtToken",JSON.stringify(action.payload.jwtToken))

        })
        .addCase(handleSignInUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.user = null;
            state.token = null;
        })
        .addCase(handleSignUpUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(handleSignUpUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(handleSignUpUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.user = null;
            state.token = null;
        });
    }
});

export const { handleLogOut } = AuthSlice.actions;

export default AuthSlice.reducer;