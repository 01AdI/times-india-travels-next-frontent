import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDestination } from "../../services/PublicApi";

const CACHE_TIME = 60 * 60 * 1000; // 60 minutes


const initialState = {
  destinations: [],
  status: "idle",
  error: null,
  lastFetched: null,
};

export const fetchDestinations = createAsyncThunk("destination/fetchDestinations",async (_, { rejectWithValue }) => {
    try {
      const response = await getDestination();

      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to load destinations."
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const destinations = getState().destinations;

      // Already loading
      if (destinations.status === "loading") {
        return false;
      }

      // Use cached data if it is still fresh
      if (destinations.lastFetched) {
        const cacheAge =
          Date.now() - destinations.lastFetched;

        if (cacheAge < CACHE_TIME) {
          return false;
        }
      }

      return true;
    },
  }
);

const destinationSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    clearDestinationCache: (state) => {
      state.destinations = [];
      state.status = "idle";
      state.error = null;
      state.lastFetched = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDestinations.pending,(state) => {
        state.status = "loading";
        state.error = null;
      }
    );

    builder.addCase(fetchDestinations.fulfilled,(state, action) => {
        state.status = "succeeded";
        state.destinations =action.payload?.destinations || [];
        state.lastFetched = Date.now();
        state.error = null;
      }
    );

    builder.addCase(fetchDestinations.rejected,(state, action) => {
        state.status = "failed";
        state.error =action.payload ||action.error?.message ||"Unable to load destinations.";
      }
    );
  },
});


export const {
  clearDestinationCache,
} = destinationSlice.actions;

export default destinationSlice.reducer;