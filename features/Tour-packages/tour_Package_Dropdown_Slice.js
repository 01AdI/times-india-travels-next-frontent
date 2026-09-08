import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getTourPackagesDropDown } from "../../services/PublicApi";

const CACHE_TIME = 60 * 60 * 1000; // 60 minutes


const initialState = {
  packages: [],
  status: "idle",
  error: null,
  lastFetched: null,
};



export const fetchTourPackagesDropDown = createAsyncThunk("tourPackageDropdown/fetchTourPackagesDropDown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTourPackagesDropDown();
      return response;

    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to fetch tour packages."
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const tourPackageDropdown =
        getState().tourPackageDropdown;

      // Already loading
      if (tourPackageDropdown.status === "loading") {
        return false;
      }

      // Use cached data if it is still fresh
      if (tourPackageDropdown.lastFetched) {
        const cacheAge =
          Date.now() - tourPackageDropdown.lastFetched;

        if (cacheAge < CACHE_TIME) {
          return false;
        }
      }

      return true;
    },
  }
);


const tourPackageDropdownSlice = createSlice({
    name: "tourPackageDropdown",
    initialState,
    reducers: {
        clearTourPackageDropdownCache: (state) => {
            state.packages = [];
            state.status = "idle";
            state.error = null;
            state.lastFetched = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTourPackagesDropDown.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(fetchTourPackagesDropDown.fulfilled,(state, action) => {
            state.status = "succeeded";
            state.error = null;
            state.packages = action.payload?.packages || [];
            state.lastFetched = Date.now();
        });

        builder.addCase(fetchTourPackagesDropDown.rejected,(state, action) => {
            state.status = "failed";
            state.error =action.payload ||"Unable to fetch tour packages.";
        });
  },
});


export const {
  clearTourPackageDropdownCache,
} = tourPackageDropdownSlice.actions;

export default tourPackageDropdownSlice.reducer;