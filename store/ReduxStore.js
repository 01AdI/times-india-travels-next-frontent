import { configureStore } from "@reduxjs/toolkit";
import homeHeroReducer from "../features/Home-page/homeHeroSlice";
import clientReviewVideoReducer from "../features/Home-page/Client_Review_Video_Slice";
import testimonialsReducer from "../features/Home-page/Client_Testimonial_Slice";
import testimonialsPageReducer from "../features/Testimonials/testimonial_Slice"
import destinationReducer from"../features/Home-page/clinet_Destination_Slice";
import tourPackageDropdownReducer from"../features/Tour-packages/tour_Package_Dropdown_Slice";
import clientGalleryReducer from"../features/AboutUs-page/client_Gallery_Slice";
import blogReducer from"../features/Blogs-page/blog_Slice";
import destinationDetailReducer from"../features/Destination-page/Destination_Detail_Slice";
import tourCategoryReducer from"../features/tour-categories/tourCategory_Slice";
import tourPackageReducer from"../features/Tour-packages/tour_Package_Slice";

export const ReduxStore = configureStore({
  reducer: {
    homeHero: homeHeroReducer,
    clientReviewsVideo: clientReviewVideoReducer,
    testimonials: testimonialsReducer,
    testimonialsPage: testimonialsPageReducer,
    destinations: destinationReducer,
    destinationDetail:destinationDetailReducer,
    tourPackageDropdown:tourPackageDropdownReducer,
    tourPackage: tourPackageReducer,
    tourCategory: tourCategoryReducer,
    clientGallery: clientGalleryReducer,
    blog:blogReducer,
  },
});