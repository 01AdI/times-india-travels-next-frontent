import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomeHeroSlides } from "../../services/PublicApi";

const CACHE_TIME = 60 * 60 * 1000; // 60 min 

const initialState = {
  slides: [],
  loading: false,
  error: null,

  // idle | loading | succeeded | failed
  status: "idle",

  lastFetched: null,
};


export const fetchHomeHero = createAsyncThunk("Home-page/fetchHomeHero",async (_, { rejectWithValue }) => {
    try {
      const response = await getHomeHeroSlides();

      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to load home hero slides."
      );
    }
  },

  {
    condition: (_, { getState }) => {
      const homeHero = getState().homeHero;

      if (homeHero.status === "loading") {
        return false;
      }

      if (homeHero.lastFetched) {
        const cacheAge = Date.now() - homeHero.lastFetched;

        if (cacheAge < CACHE_TIME) {
          return false;
        }
      }


      return true;
    },
  }
);


const homeHeroSlice = createSlice({
  name: "homeHero",

  initialState,

  reducers: {
    clearHomeHeroCache: (state) => {
      state.slides = [];
      state.lastFetched = null;
      state.error = null;
      state.status = "idle";
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
 
    builder.addCase(fetchHomeHero.pending, (state) => {
      state.loading = true;
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchHomeHero.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";

      state.slides = action.payload?.data || [];

      state.lastFetched = Date.now();

      state.error = null;

    });

    builder.addCase(fetchHomeHero.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";

      state.error =
        action.payload ||
        action.error?.message ||
        "Unable to load home hero slides.";
    });
  },
});

export const { clearHomeHeroCache } = homeHeroSlice.actions;

export default homeHeroSlice.reducer;