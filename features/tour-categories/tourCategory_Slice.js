import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getTourCategories,
  getTourCategoreisDetails,
} from "../../services/PublicApi";

const CACHE_TIME = 60 * 60 * 1000; // 60 minutes

const initialState = {
  // All categories + their packages.
  // Used mainly by navbar/category navigation.
  categories: [],
  categoryCount: 0,

  status: "idle",
  error: null,
  lastFetched: null,

  // Currently selected category detail.
  categoryDetail: null,
  detailStatus: "idle",
  detailError: null,
};

export const fetchTourCategories = createAsyncThunk("tourCategory/fetchTourCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTourCategories();

      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load tour categories."
      );
    }
  },

  {
    condition: (_, { getState }) => {
      const tourCategory = getState().tourCategory;

      // Prevent duplicate request
      if (tourCategory.status === "loading") {
        return false;
      }

      // Use cached categories if still fresh
      if (tourCategory.lastFetched) {
        const cacheAge = Date.now() - tourCategory.lastFetched;

        if (cacheAge < CACHE_TIME) {
          return false;
        }
      }

      return true;
    },
  }
);

export const fetchTourCategoryDetail = createAsyncThunk("tourCategory/fetchTourCategoryDetail",
  async (id, { rejectWithValue }) => {
    try {
      if (!id || typeof id !== "string") {
        return rejectWithValue("Tour category ID is required.");
      }

      const cleanId = id.trim().toLowerCase();

      if (!cleanId) {
        return rejectWithValue("Tour category ID is required.");
      }

      const response = await getTourCategoreisDetails(cleanId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load tour category."
      );
    }
  },

  {
    condition: (id, { getState }) => {
      const tourCategory = getState().tourCategory;

      if (!id || typeof id !== "string") {
        return false;
      }

      if (tourCategory.detailStatus === "loading") {
        return false;
      }

      return true;
    },
  }
);

const tourCategorySlice = createSlice({
  name: "tourCategory",

  initialState,

  reducers: {
    clearTourCategoryCache: (state) => {
      state.categories = [];
      state.categoryCount = 0;
      state.status = "idle";
      state.error = null;
      state.lastFetched = null;
    },

    clearTourCategoryDetail: (state) => {
      state.categoryDetail = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },

    clearTourCategory: (state) => {
      state.categories = [];
      state.categoryCount = 0;

      state.status = "idle";
      state.error = null;
      state.lastFetched = null;

      state.categoryDetail = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(fetchTourCategories.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchTourCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.categories = action.payload?.categories || [];
      state.categoryCount =action.payload?.categories?.length || 0;
      state.lastFetched = Date.now();
      state.error = null;
    });

    builder.addCase(fetchTourCategories.rejected, (state, action) => {
      state.status = "failed";

      state.error =
        action.payload ||
        action.error?.message ||
        "Unable to load tour categories.";
    });

    builder.addCase(fetchTourCategoryDetail.pending, (state) => {
      state.detailStatus = "loading";
      state.detailError = null;
      state.categoryDetail = null;
    });

    builder.addCase(
      fetchTourCategoryDetail.fulfilled,
      (state, action) => {
        state.detailStatus = "succeeded";

        state.categoryDetail =
          action.payload?.category || null;

        state.detailError = null;
      }
    );

    builder.addCase(
      fetchTourCategoryDetail.rejected,
      (state, action) => {
        state.detailStatus = "failed";

        state.detailError =
          action.payload ||
          action.error?.message ||
          "Unable to load tour category.";

        state.categoryDetail = null;
      }
    );
  },
});


export const {
  clearTourCategoryCache,
  clearTourCategoryDetail,
  clearTourCategory,
} = tourCategorySlice.actions;

export const selectTourCategories = (state) =>state.tourCategory.categories;
export const selectTourCategoryCount = (state) =>state.tourCategory.categoryCount;
export const selectTourCategoriesStatus = (state) =>state.tourCategory.status;
export const selectTourCategoriesError = (state) =>state.tourCategory.error;
export const selectTourCategoriesLastFetched = (state) =>state.tourCategory.lastFetched;
export const selectTourCategoryDetail = (state) =>state.tourCategory.categoryDetail;
export const selectTourCategoryDetailStatus = (state) =>state.tourCategory.detailStatus;
export const selectTourCategoryDetailError = (state) =>state.tourCategory.detailError;

export default tourCategorySlice.reducer;