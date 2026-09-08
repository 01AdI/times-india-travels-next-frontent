import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {getClientTestimonials,getDetailClientTestimonial,} from "../../services/PublicApi";


const CACHE_TIME = 60 * 60 * 1000; // 60 minutes

const initialState = {

  testimonials: [],
  count: 0,

  status: "idle",
  error: null,
  lastFetched: null,
  testimonialDetail: null,
  detailStatus: "idle",
  detailError: null,
};

export const fetchClientTestimonials = createAsyncThunk(
  "testimonialsPage/fetchClientTestimonials",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getClientTestimonials();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ||error?.message ||"Unable to load testimonials.");
    }
  },

  {
    condition: (_, { getState }) => {
      const testimonialsPage =getState().testimonialsPage;

      // Prevent duplicate requests
      if (testimonialsPage.status === "loading") {
        return false;
      }

      // Use cached data if still fresh
      if (testimonialsPage.lastFetched) {
        const cacheAge =
          Date.now() -
          testimonialsPage.lastFetched;

        if (cacheAge < CACHE_TIME) {
          return false;
        }
      }

      return true;
    },
  }
);

export const fetchDetailClientTestimonial =createAsyncThunk(
    "testimonialsPage/fetchDetailClientTestimonial",
    async (id, { rejectWithValue }) => {
      try {
        // Validate ID
        if (!id) {
          return rejectWithValue(
            "Testimonial ID is required."
          );
        }

        const response =
          await getDetailClientTestimonial(id);

        return response;
      } catch (error) {
        return rejectWithValue(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to load testimonial."
        );
      }
    },

    {
      condition: (_, { getState }) => {
        const testimonialsPage =
          getState().testimonialsPage;

        // Prevent duplicate detail requests
        if (
          testimonialsPage.detailStatus ===
          "loading"
        ) {
          return false;
        }

        return true;
      },
    }
  );

const testimonialsPageSlice = createSlice({
  name: "testimonialsPage",
  initialState,

  reducers: {

    clearTestimonialsPageCache: (state) => {
      state.testimonials = [];
      state.count = 0;
      state.status = "idle";
      state.error = null;
      state.lastFetched = null;
    },

    clearTestimonialPageDetail: (state) => {
      state.testimonialDetail = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },

    clearTestimonialsPage: (state) => {
      // All testimonials
      state.testimonials = [];
      state.count = 0;

      state.status = "idle";
      state.error = null;
      state.lastFetched = null;
      state.testimonialDetail = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(fetchClientTestimonials.pending,(state) => {
        state.status = "loading";
        state.error = null;
      }
    );

    builder.addCase(fetchClientTestimonials.fulfilled,(state, action) => {
        state.status = "succeeded";
        state.testimonials =action.payload?.data || [];
        state.count =action.payload?.count ||action.payload?.data?.length ||0;
        state.lastFetched = Date.now();
        state.error = null;
      }
    );

    builder.addCase(fetchClientTestimonials.rejected,(state, action) => {
        state.status = "failed";
        state.error =action.payload ||action.error?.message ||"Unable to load testimonials.";
      }
    );

    builder.addCase(fetchDetailClientTestimonial.pending,(state) => {
        state.detailStatus = "loading";
        state.detailError = null;

        // Clear previous testimonial
        // while the new one is loading.
        state.testimonialDetail = null;
      }
    );

    builder.addCase(fetchDetailClientTestimonial.fulfilled,(state, action) => {
        state.detailStatus = "succeeded";
        state.testimonialDetail =action.payload?.data || null;
        state.detailError = null;
      }
    );

    builder.addCase(fetchDetailClientTestimonial.rejected,(state, action) => {
        state.detailStatus = "failed";
        state.detailError =action.payload ||action.error?.message ||"Unable to load testimonial.";

        state.testimonialDetail = null;
      }
    );
  },
});

export const {clearTestimonialsPageCache,clearTestimonialPageDetail,clearTestimonialsPage,} = testimonialsPageSlice.actions;

export const selectTestimonials = (state) =>state.testimonialsPage.testimonials;
export const selectTestimonialCount = (state) =>state.testimonialsPage.count;
export const selectTestimonialsStatus = (state) =>state.testimonialsPage.status;
export const selectTestimonialsError = (state) =>state.testimonialsPage.error;
export const selectTestimonialsLastFetched = (state) =>state.testimonialsPage.lastFetched;

export const selectTestimonialDetail = (state) =>state.testimonialsPage.testimonialDetail;
export const selectTestimonialDetailStatus = (state) =>state.testimonialsPage.detailStatus;
export const selectTestimonialDetailError = (state) =>state.testimonialsPage.detailError;

export default testimonialsPageSlice.reducer;