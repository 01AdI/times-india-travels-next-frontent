import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDestinationDetail } from "../../services/PublicApi";

const CACHE_TIME = 60 * 60 * 1000; // 60 minutes

const initialState = {
  destination: null,
  status: "idle",
  error: null,
  lastFetched: null,
  currentId: null,
};

export const fetchDestinationDetail = createAsyncThunk("destinationDetail/fetchDestinationDetail",

  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Destination ID is required.");
      }

      const response = await getDestinationDetail(id);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to load destination details."
      );
    }
  },

  {
    condition: (id, { getState }) => {
      if (!id) {
        return false;
      }

      const destinationDetail =
        getState().destinationDetail;

      // Already loading
      if (destinationDetail.status === "loading") {
        return false;
      }

      if (destinationDetail.currentId === id &&destinationDetail.lastFetched) {
        const cacheAge =
          Date.now() - destinationDetail.lastFetched;

        if (cacheAge < CACHE_TIME) {
          return false;
        }
      }

      return true;
    },
  }
);

const destinationDetailSlice = createSlice({
  name: "destinationDetail",
  initialState,

  reducers: {
    clearDestinationDetail: (state) => {
      state.destination = null;
      state.status = "idle";
      state.error = null;
      state.lastFetched = null;
      state.currentId = null;
    },
  },

  extraReducers: (builder) => {
    
    builder.addCase(
        fetchDestinationDetail.pending,
        (state, action) => {
          state.status = "loading";
          state.error = null;

          // Keep track of which destination we're loading
          state.currentId = action.meta.arg;
        }
      )

    
    builder.addCase(
        fetchDestinationDetail.fulfilled,
        (state, action) => {
          state.status = "succeeded";

          state.destination =
            action.payload?.destination || null;

          state.lastFetched = Date.now();

          state.error = null;

          state.currentId =
            action.meta.arg;
        }
      )
    builder.addCase(
        fetchDestinationDetail.rejected,
        (state, action) => {
          state.status = "failed";

          state.error =
            action.payload ||
            action.error?.message ||
            "Unable to load destination details.";
        }
      );
  },
});

export const {clearDestinationDetail,} = destinationDetailSlice.actions;

export default destinationDetailSlice.reducer;