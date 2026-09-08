import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {getBlogs,getBlogBySlug,} from "../../services/PublicApi";

const CACHE_TIME = 60 * 60 * 1000; // 60 minutes

const initialState = {

  blogs: [],

  pagination: {
    currentPage: 1,
    limit: 10,
    totalBlogs: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },

  error: null,
  status: "idle",

  // Keeps track of when each page was fetched
  pageCache: {},

  selectedBlog: null,
  detailStatus: "idle",
  detailError: null,
  detailSlug: null,
};

export const fetchBlogs = createAsyncThunk("blog/fetchBlogs",
  async (
    { page = 1, limit = 10 } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await getBlogs(page, limit);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to load blogs."
      );
    }
  },

  {
    condition: (
      { page = 1, limit = 10 } = {},
      { getState }
    ) => {
      const blog = getState().blog;

      // Prevent duplicate request for the same page
      if (blog.status === "loading" &&blog.pagination.currentPage === page) {
        return false;
      }

      const cacheKey = `${page}-${limit}`;

      const lastFetched = blog.pageCache[cacheKey];

      if (lastFetched) {
        const cacheAge = Date.now() - lastFetched;

        if (cacheAge < CACHE_TIME) {
          return false;
        }
      }

      return true;
    },
  }
);


export const fetchBlogBySlug = createAsyncThunk("blog/fetchBlogBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const cleanSlug = slug?.trim().toLowerCase();

      if (!cleanSlug) {
        return rejectWithValue("Blog slug is required.");
      }

      const response = await getBlogBySlug(cleanSlug);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to load blog."
      );
    }
  },
  {
    condition: (slug, { getState }) => {
      const blog = getState().blog;

      const cleanSlug = slug?.trim().toLowerCase();

      if (!cleanSlug) {
        return false;
      }

      if (
        blog.detailStatus === "succeeded" &&
        blog.detailSlug === cleanSlug &&
        blog.selectedBlog
      ) {
        return false;
      }

      if (
        blog.detailStatus === "loading" &&
        blog.detailSlug === cleanSlug
      ) {
        return false;
      }

      return true;
    },
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,

  reducers: {

    clearBlogCache: (state) => {
      state.blogs = [];

      state.pagination = {
        currentPage: 1,
        limit: 10,
        totalBlogs: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
      state.error = null;
      state.status = "idle";
      state.pageCache = {};
    },

    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
      state.detailStatus = "idle";
      state.detailError = null;
      state.detailSlug = null;
    },
  },

  extraReducers: (builder) => {
    
    builder.addCase(fetchBlogs.pending, (state, action) => {
      state.status = "loading";
      state.error = null;

      const {
        page = 1,
        limit = 10,
      } = action.meta.arg || {};

      state.pagination.currentPage = page;
      state.pagination.limit = limit;
    });

    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.status = "succeeded";

      const newBlogs = action.payload?.data || [];

      const {
        page = 1,
        limit = 10,
      } = action.meta.arg || {};

      if (page === 1) {
        state.blogs = newBlogs;
      } else {
        const existingIds = new Set(
          state.blogs.map(
            (blog) => blog._id || blog.slug
          )
        );

        const uniqueNewBlogs = newBlogs.filter(
          (blog) =>
            !existingIds.has(
              blog._id || blog.slug
            )
        );

        state.blogs = [
          ...state.blogs,
          ...uniqueNewBlogs,
        ];
      }

      state.pagination =
        action.payload?.pagination ||
        state.pagination;

      const cacheKey = `${page}-${limit}`;

      state.pageCache[cacheKey] = Date.now();

      state.error = null;
    });

    builder.addCase(fetchBlogs.rejected, (state, action) => {
      if (action.meta.condition) {
        return;
      }

      state.status = "failed";

      state.error =
        action.payload ||
        action.error?.message ||
        "Unable to load blogs.";
    });

    builder.addCase(fetchBlogBySlug.pending, (state, action) => {
      state.detailStatus = "loading";
      state.detailError = null;
      state.detailSlug =
        action.meta.arg?.trim().toLowerCase();
    });

    builder.addCase(fetchBlogBySlug.fulfilled, (state, action) => {
      state.detailStatus = "succeeded";

      state.selectedBlog =
        action.payload?.data || null;

      state.detailSlug =
        action.meta.arg?.trim().toLowerCase();

      state.detailError = null;
    });

    builder.addCase(fetchBlogBySlug.rejected, (state, action) => {
      if (action.meta.condition) {
        return;
      }

      state.detailStatus = "failed";

      state.detailError =
        action.payload ||
        action.error?.message ||
        "Unable to load blog.";
    });
  },
});

export const {clearBlogCache,clearSelectedBlog,} = blogSlice.actions;


export default blogSlice.reducer;