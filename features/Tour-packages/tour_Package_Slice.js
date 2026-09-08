import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getTourPackages,
  getDetailTourPackages,
} from "../../services/PublicApi";

const CACHE_TIME = 60 * 60 * 1000; // 60 minutes

const DEFAULT_PAGINATION = {
  currentPage: 1,
  limit: 20,
  totalPackages: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const initialState = {
  // Current listing result
  packages: [],

  pagination: {
    ...DEFAULT_PAGINATION,
  },

  status: "idle",
  error: null,
  lastQuery: null,
  lastFetched: null,
  packageDetail: null,
  detailStatus: "idle",
  detailError: null,
};

export const fetchTourPackages = createAsyncThunk("tourPackage/fetchTourPackages",
  async (
    {
      page = 1,
      limit = 20,
      mostLoved,
      specialPackage,
      categorySlug,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      params.set("page", String(page));
      params.set("limit", String(limit));

      if (mostLoved !== undefined && mostLoved !== null) {
        params.set("mostLoved", String(mostLoved));
      }

      if (specialPackage !== undefined && specialPackage !== null) {
        params.set(
          "specialPackage",
          String(specialPackage)
        );
      }

      if (categorySlug) {
        params.set(
          "categorySlug",
          categorySlug.trim().toLowerCase()
        );
      }

      const queryString = params.toString();

      const response = await getTourPackages(
        queryString ? `?${queryString}` : ""
      );

      return {
        ...response,
        requestQuery: queryString,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load tour packages."
      );
    }
  },

  {
    condition: (args = {}, { getState }) => {
      const tourPackage = getState().tourPackage;

      const {
        page = 1,
        limit = 20,
        mostLoved,
        specialPackage,
        categorySlug,
      } = args || {};

      const params = new URLSearchParams();

      params.set("page", String(page));
      params.set("limit", String(limit));

      if (mostLoved !== undefined && mostLoved !== null) {
        params.set("mostLoved", String(mostLoved));
      }

      if (specialPackage !== undefined && specialPackage !== null) {
        params.set(
          "specialPackage",
          String(specialPackage)
        );
      }

      if (categorySlug) {
        params.set(
          "categorySlug",
          categorySlug.trim().toLowerCase()
        );
      }

      const requestQuery = params.toString();

      if (
        tourPackage.status === "loading" &&
        tourPackage.lastQuery === requestQuery
      ) {
        return false;
      }

      if (
        tourPackage.lastQuery === requestQuery &&
        tourPackage.lastFetched
      ) {
        const cacheAge =
          Date.now() - tourPackage.lastFetched;

        if (cacheAge < CACHE_TIME) {
          return false;
        }
      }

      return true;
    },
  }
);


export const fetchTourPackageDetail = createAsyncThunk("tourPackage/fetchTourPackageDetail",
  async (id, { rejectWithValue }) => {
    try {
      if (!id || typeof id !== "string") {
        return rejectWithValue(
          "Tour package ID is required."
        );
      }

      const cleanId = id.trim().toLowerCase();

      if (!cleanId) {
        return rejectWithValue(
          "Tour package ID is required."
        );
      }

      const response =await getDetailTourPackages(cleanId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load tour package."
      );
    }
  },

  {
    condition: (id, { getState }) => {
      const tourPackage = getState().tourPackage;

      if (!id || typeof id !== "string") {
        return false;
      }

      if (tourPackage.detailStatus === "loading") {
        return false;
      }

      return true;
    },
  }
);


const tourPackageSlice = createSlice({
  name: "tourPackage",

  initialState,

  reducers: {

    clearTourPackageCache: (state) => {
      state.packages = [];

      state.pagination = {
        ...DEFAULT_PAGINATION,
      };

      state.status = "idle";
      state.error = null;

      state.lastQuery = null;
      state.lastFetched = null;
    },

    clearTourPackageDetail: (state) => {
      state.packageDetail = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },

    clearTourPackages: (state) => {
      state.packages = [];

      state.pagination = {
        ...DEFAULT_PAGINATION,
      };

      state.status = "idle";
      state.error = null;

      state.lastQuery = null;
      state.lastFetched = null;

      state.packageDetail = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(fetchTourPackages.pending,(state, action) => {
        state.status = "loading";
        state.error = null;

        const {
          page = 1,
          limit = 20,
          mostLoved,
          specialPackage,
          categorySlug,
        } = action.meta.arg || {};

        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", String(limit));

        if (
          mostLoved !== undefined &&
          mostLoved !== null
        ) {
          params.set(
            "mostLoved",
            String(mostLoved)
          );
        }

        if (specialPackage !== undefined &&specialPackage !== null) {
          params.set(
            "specialPackage",
            String(specialPackage)
          );
        }

        if (categorySlug) {
          params.set(
            "categorySlug",
            categorySlug.trim().toLowerCase()
          );
        }

        state.lastQuery = params.toString();

      }
    );

    builder.addCase(fetchTourPackages.fulfilled,(state, action) => {
        state.status = "succeeded";

        state.packages =action.payload?.packages || [];

        state.pagination =action.payload?.pagination || {
            ...DEFAULT_PAGINATION,
          };

        state.lastQuery =action.payload?.requestQuery || "";
        state.lastFetched = Date.now();
        state.error = null;
      }
    );

    builder.addCase(fetchTourPackages.rejected,(state, action) => {
        state.status = "failed";

        state.error =
          action.payload ||
          action.error?.message ||
          "Unable to load tour packages.";
      }
    );


    builder.addCase(fetchTourPackageDetail.pending,(state) => {
        state.detailStatus = "loading";
        state.detailError = null;
        state.packageDetail = null;
      }
    );

    builder.addCase(
      fetchTourPackageDetail.fulfilled,
      (state, action) => {
        state.detailStatus = "succeeded";

        state.packageDetail =
          action.payload?.package || null;

        state.detailError = null;
      }
    );

    builder.addCase(
      fetchTourPackageDetail.rejected,
      (state, action) => {
        state.detailStatus = "failed";

        state.detailError =
          action.payload ||
          action.error?.message ||
          "Unable to load tour package.";

        state.packageDetail = null;
      }
    );
  },
});


export const {
  clearTourPackageCache,
  clearTourPackageDetail,
  clearTourPackages,
} = tourPackageSlice.actions;


export const selectTourPackages = (state) =>
  state.tourPackage.packages;

export const selectTourPackagePagination = (state) =>
  state.tourPackage.pagination;

export const selectTourPackagesStatus = (state) =>
  state.tourPackage.status;

export const selectTourPackagesError = (state) =>
  state.tourPackage.error;

export const selectTourPackagesLastFetched = (state) =>
  state.tourPackage.lastFetched;

export const selectTourPackagesLastQuery = (state) =>
  state.tourPackage.lastQuery;

export const selectTourPackageDetail = (state) =>
  state.tourPackage.packageDetail;

export const selectTourPackageDetailStatus = (state) =>
  state.tourPackage.detailStatus;

export const selectTourPackageDetailError = (state) =>
  state.tourPackage.detailError;


export default tourPackageSlice.reducer;