import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getClinetGalleyAboutUS } from "../../services/PublicApi";


const CACHE_TIME = 60 * 60 * 1000; // 60 minutes

const initialState = {
  gallery: [],
  error: null,
  status: "idle",
  lastFetched: null,
};

export const fetchClientGallery = createAsyncThunk("clientGallery/fetchClientGallery",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getClinetGalleyAboutUS();

      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to load client gallery."
      );
    }
  },

  {
    condition: (_, { getState }) => {
      const clientGallery = getState().clientGallery;

      // Prevent duplicate requests
      if (clientGallery.status === "loading") {
        return false;
      }

      // Use cached data if still fresh
      if (clientGallery.lastFetched) {
        const cacheAge = Date.now() - clientGallery.lastFetched;

        if (cacheAge < CACHE_TIME) {
          return false;
        }
      }

      return true;
    },
  }
);

const clientGallerySlice = createSlice({
  name: "clientGallery",

  initialState,

  reducers: {

    clearClientGalleryCache: (state) => {
      state.gallery = [];
      state.error = null;
      state.status = "idle";
      state.lastFetched = null;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(fetchClientGallery.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchClientGallery.fulfilled, (state, action) => {
      state.status = "succeeded";

      state.gallery = action.payload?.data || [];

      state.lastFetched = Date.now();

      state.error = null;
    });

    builder.addCase(fetchClientGallery.rejected, (state, action) => {
      state.status = "failed";

      state.error =
        action.payload ||
        action.error?.message ||
        "Unable to load client gallery.";
    });
  },
});

export const { clearClientGalleryCache } =clientGallerySlice.actions;

export default clientGallerySlice.reducer;