import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_MONITORING_SERVICE_BASE_URL,
  headers: {
    Authorization: `${JSON.parse(localStorage.getItem("jwtToken"))}`,
  },
});

export const viewMonitoredApi = createAsyncThunk(
  "monitor/viewApi",
  async (apiId, thunkAPI) => {
    try {
      const response = await api.get(`/monitored-api/${apiId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch API");
    }
  }
);

export const updateMonitoredApi = createAsyncThunk(
  "monitor/updateApi",
  async ({ apiId, updatedData }, thunkAPI) => {
    try {
      console.log("lllllllll");
      
      console.log(updatedData);
      
      const response = await api.put(`/api/${apiId}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to update API");
    }
  }
);

export const deleteMonitoredApi = createAsyncThunk(
  "monitor/deleteApi",
  async (apiId, thunkAPI) => {
    try {
     const response = await api.delete(`/api/${apiId}`);
      return response; // return id so reducer can remove from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to delete API");
    }
  }
);

export const handleFetchIndividualApi = createAsyncThunk(
  "monitor/fetchIndividualApi",
  async (apiId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MONITORING_SERVICE_BASE_URL}/${apiId}`,
        {
          headers: {
            Authorization: `${JSON.parse(localStorage.getItem("jwtToken"))}`
          }
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const initialState ={
    downTimeIncidents: JSON.parse(localStorage.getItem("monitoredApi"))?.downTimeIncidents || [] ,
    healthCheckLogs:JSON.parse(localStorage.getItem("monitoredApi"))?.healthCheckLogs ||[] ,
    latencyLogs:JSON.parse(localStorage.getItem("monitoredApi"))?.latencyLogs ||[],
    monitoredApis:JSON.parse(localStorage.getItem("monitoredApi"))?.monitoredApis ||[] ,
    thresholdConfig:JSON.parse(localStorage.getItem("monitoredApi"))?.thresholdConfigs ||[] ,
    isLoading : false 
}


export const handleFetchMonitoredApisData = createAsyncThunk(
    'monitor/fetchMonitoredAPIs',
    async ( credentials , thunkAPI) => {
        try {

            console.log("Received Request In handleFetchMonitoredApisData ==> " +`${localStorage.getItem("jwtToken")}` ) ;
            console.log(credentials);
            const response = await axios
              .get(`${import.meta.env.VITE_MONITORING_SERVICE_BASE_URL}/fetchdata/admin`, {
                headers: {
                    Authorization: `${JSON.parse(localStorage.getItem("jwtToken"))}` 
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
    )
    .addCase(viewMonitoredApi.fulfilled, (state, action) => {
      state.selectedApi = action.payload; // store in new field
    })

    .addCase(updateMonitoredApi.fulfilled, (state, action) => {
      const updatedMonitoredApi = action.payload.monitoredApi;
      const updatedThresholdConfig = action.payload.thresholdConfig ;
      state.monitoredApis = state.monitoredApis.map((api) =>
        api.apiId === updateMonitoredApi.apiId ? updatedMonitoredApi : api
      );

      state.thresholdConfig = state.thresholdConfig.map((config)=>
      config.thresholdId  === updatedThresholdConfig.thresholdId ? updatedThresholdConfig :config
      )
    })
    .addCase(deleteMonitoredApi.fulfilled, (state, action) => {
      const apiId = action.payload;
      state.monitoredApis = state.monitoredApis.filter(
        (api) => api.apiId !== apiId
      );
    });
    }
});

export default MonitorSlice.reducer ;