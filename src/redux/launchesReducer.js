import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { isLaunchDataLoading: false, launches: [] };

const config = {
  method: "get",
  url: "https://api.spacexdata.com/v3/launches",
};

export const getLaunchData = createAsyncThunk(
  "launches/getLaunches",
  async () => {
    const response = await axios(config);
    return response.data;
  }
);

const launchesSlice = createSlice({
  name: "launches",
  initialState,

  extraReducers: {
    [getLaunchData.pending]: (state, action) => {
      state.isLaunchDataLoading = true;
    },
    [getLaunchData.fulfilled]: (state, { payload }) => {
      state.isLaunchDataLoading = false;
      state.launches = payload;
    },
    [getLaunchData.rejected]: (state, action) => {
      state.isLaunchDataLoading = false;
    },
  },
});

// export const { getLaunches } = launchesSlice.actions;
export default launchesSlice.reducer;
