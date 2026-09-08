import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomePageTestimonials } from "../../services/PublicApi";

const CACHE_TIME = 60 * 60 * 1000; // 60 minutes

const initialState = {
  testimonials: [],
  status: "idle",
  error: null,
  lastFetched: null,
};

export const fetchHomePageTestimonials = createAsyncThunk("testimonials/fetchHomePageTestimonials",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getHomePageTestimonials();
            return response;
        } catch (error) {
            return rejectWithValue(
            error.message || "Unable to load homepage testimonials."
            );
        }
    },
    {
        condition: (_, { getState }) => {
            const testimonials = getState().testimonials;
        
            if (testimonials.status === "loading") {
                return false;
            }

            // Use cached data if it is still fresh
            if (testimonials.lastFetched) {
                const cacheAge =Date.now() - testimonials.lastFetched;
                if (cacheAge < CACHE_TIME) {
                return false;
                }
            }
            return true;
        },
    }
);


const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    clearTestimonialsCache: (state) => {
      state.testimonials = [];
      state.status = "idle";
      state.error = null;
      state.lastFetched = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchHomePageTestimonials.pending,(state) => {
        state.status = "loading";
        state.error = null;
        }
    );

    builder.addCase(fetchHomePageTestimonials.fulfilled,(state, action) => {
            state.status = "succeeded";
            state.testimonials =action.payload?.data || [];
            state.lastFetched = Date.now();
            state.error = null;
        }
    );

    builder.addCase(fetchHomePageTestimonials.rejected,(state, action) => {
            state.status = "failed";
            state.error =action.payload ||action.error?.message ||"Unable to load homepage testimonials.";
        }
    );
  },
});


export const {
  clearTestimonialsCache,
} = testimonialsSlice.actions;


export default testimonialsSlice.reducer;
