import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    user: null,
    token: null,
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
              .post(`${import.meta.env.VITE_AUTH_SERVICE_BASE_URL}/signin`, credentials)
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
              .post(`${import.meta.env.VITE_AUTH_SERVICE_BASE_URL}/signup`, credentials)
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
       handleLogOut:( state ) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.error = null;
       }
    } ,
    extraReducers: (builder) => {
        builder
        .addCase(handleSignInUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(handleSignInUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
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