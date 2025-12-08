import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";



const initialState ={
    downTimeIncidents: [] ,
    healthCheckLogs:[] ,
    latencyLogs:[],
    monitoredApis:[] ,
    thresholdConfig:[] ,
    isLoading : false 
}


export const handleFetchMonitoredApisData = createAsyncThunk(
    'monitor/fetchMonitoredAPIs',
    async ( credentials , thunkAPI) => {
        try {

            console.log("Received Request In handleFetchMonitoredApisData ==> " +" Bearer" +  `${localStorage.getItem("jwtToken")}` ) ;
            console.log(credentials);
            const response = await axios
              .get(`${import.meta.env.VITE_MONITORING_SERVICE_BASE_URL}/fetchdata/admin`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwtToken"))}` 
                }
              })
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to sign up');
        }
    }
);







const MonitorSlice = createSlice({
    name: 'monitor',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(handleFetchMonitoredApisData.pending, (state) => {
            state.isLoading = true ;
        })
        .addCase(handleFetchMonitoredApisData.fulfilled, (state, action) => {
            console.log("Fetch Monitored APIs Data Action ==> ");
            console.log(action);
            state.isLoading = false ;   
            state.monitoredApis = action.payload.monitoredApis ;
            state.downTimeIncidents = action.payload.downTimeIncidents ;
            state.healthCheckLogs = action.payload.healthCheckLogs ;
            state.latencyLogs = action.payload.latencyLogs ;
            state.thresholdConfig = action.payload.thresholdConfigs ;
        })
        .addCase(handleFetchMonitoredApisData.rejected, (state, action) => {
            state.isLoading = false ;
        }
        ) ;
    }
});

export default MonitorSlice.reducer ;