import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getClientReviewVideos } from "../../services/PublicApi";

const CACHE_TIME = 60 * 60 * 1000; // 60 minutes

const initialState = {
  videos: [],
  error: null,
  status: "idle",
  lastFetched: null,
};

export const fetchClientReviewVideos = createAsyncThunk("clientReviewsVideo/fetchClientReviewVideos",
    async (_, { rejectWithValue }) => {
        try {
        const response = await getClientReviewVideos();
        return response;
        } catch (error) {
        return rejectWithValue(
            error.message || "Unable to load client review videos."
        );
        }
    },
    {
      condition: (_, { getState }) => {
        const clientReviews = getState().clientReviewsVideo;
        if (clientReviews.status === "loading") {
          return false;
        }
        if (clientReviews.lastFetched) {
          const cacheAge =Date.now() - clientReviews.lastFetched;
          if (cacheAge < CACHE_TIME) {
            return false;
          }
        }
        return true;
      },
    }
);

const clientReviewVideoSlice = createSlice({
  name: "clientReviewsVideo",
  initialState,

  reducers: {
    clearClientReviewCache: (state) => {
      state.videos = [];
      state.error = null;
      state.status = "idle";
      state.lastFetched = null;
    },
  },

    extraReducers: (builder) => {
            
        builder.addCase(fetchClientReviewVideos.pending,(state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(fetchClientReviewVideos.fulfilled,(state, action) => {
            state.status = "succeeded";
            state.videos =action.payload?.data || [];
            state.lastFetched = Date.now();
            state.error = null;
        });

        builder.addCase(fetchClientReviewVideos.rejected,(state, action) => {
            state.status = "failed";
            state.error =action.payload ||action.error?.message ||"Unable to load client review videos.";
        });
    },
});

export const {
  clearClientReviewCache,
} = clientReviewVideoSlice.actions;

export default clientReviewVideoSlice.reducer;