import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLaunchDataLoading: false,
  launches: [],
  filteredLaunches: [],
};

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
  reducers: {
    filterLaunches(state, { payload }) {
      const { launches } = state;
      const { filterKey, filterValue = true } = payload;

      const newLaunches = launches.filter(
        (launch) => launch[filterKey] === filterValue
      );
      state.filteredLaunches = newLaunches;
    },
    filterLaunchesByDateRange(state, { payload }) {
      const { launches } = state;
      const { startDate, endDate } = payload;

      const newLaunches = launches.filter((launch) => {
        const newDateObj = new Date(launch.launch_date_utc);
        return newDateObj > startDate && newDateObj < endDate;
      });
      state.filteredLaunches = newLaunches;
    },
  },
  extraReducers: {
    [getLaunchData.pending]: (state) => {
      state.isLaunchDataLoading = true;
    },
    [getLaunchData.fulfilled]: (state, { payload }) => {
      state.isLaunchDataLoading = false;
      state.launches = payload;
      state.filteredLaunches = payload;
    },
    [getLaunchData.rejected]: (state) => {
      state.isLaunchDataLoading = false;
    },
  },
});

export const {
  filterLaunches,
  filterLaunchesByDateRange,
} = launchesSlice.actions;
export default launchesSlice.reducer;
