import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_ALERTING_SERVICE_BASE_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwtToken"))}`,
  },
});

export const fetchTop60Alerts = createAsyncThunk(
  "monitor/fetchAlerts",
  async (thunkAPI) => {
    try {
        console.log("Sending ==> " + `Bearer ${JSON.parse(localStorage.getItem("jwtToken"))}`);
        
      const response = await api.get("");
      return response.data;
    } catch (error) {
        console.log(error);
        
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch Alerts API");
    }
  }
);




const initialState ={
    alertsList: JSON.parse(localStorage.getItem("alertsList"))?.downTimeIncidents || [] ,
    isLoading : false 
}







const MonitorSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        
    .addCase(fetchTop60Alerts.fulfilled, (state, action) => {
      state.alertsList = action.payload; // store in new field
    })
    }
});

export default MonitorSlice.reducer ;