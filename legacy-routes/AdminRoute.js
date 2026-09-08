import {Routes, Route } from "react-router";
import { lazy, Suspense } from "react";

import NotFound from "../utils/NotFound";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminLoading from "../legacy-utils/AdminLoading";




const AdminDashboard = lazy(()=>import("../admin/pages/AdminDashboard"));
const AdminManagement = lazy(()=>import("../admin/pages/admin-managment/AdminManagement"));

const AdminTourEnquiries = lazy(()=>import("../admin/pages/tour-enquiry/AdminTourEnquiries"));
const AdminTourEnquiryDetails =lazy(()=>import("../admin/pages/tour-enquiry/AdminTourEnquiryDetails"));
const AdminTourEnquiryEdit =lazy(()=>import("../admin/pages/tour-enquiry/AdminTourEnquiryEdit"));


const AdminTestimonials = lazy(()=>import("../admin/pages/testimonials/AdminTestimonials"));
const AdminCreateTestimonial = lazy(()=>import("../admin/pages/testimonials/AdminCreateTestimonial"));
const AdminTestimonialsDetails = lazy(()=>import("../admin/pages/testimonials/AdminTestimonialDetails"));

const AdminBlogs = lazy(()=>import("../admin/pages/blogs/AdminBlogs"));
const AdminBlogCreate =lazy(()=>import("../admin/pages/blogs/AdminBlogCreate"));
const AdminBlogDetails = lazy(()=>import("../admin/pages/blogs/AdminBlogDetails"));
const AdminBlogEdit = lazy(()=>import("../admin/pages/blogs/AdminBlogEdit"));

const AdminHomeHero = lazy(()=>import("../admin/pages/home-hero-images/AdminHomeHero"));
const AdminHomeHeroCreate = lazy(()=>import("../admin/pages/home-hero-images/AdminHomeHeroCreate"));
const AdminHomeHeroEdit = lazy(()=>import("../admin/pages/home-hero-images/AdminHomeHeroEdit"));

const ClientGallery = lazy(()=>import("../admin/pages/about-us-client-galley/ClientGallery"));
const ClientReviewVideos = lazy(()=>import("../admin/pages/home-client-video/ClientReviewVideos"));

const CarRentalEnquiriesPage = lazy(()=>import("../admin/pages/car-rental-enquiry/CarRentalPage"));
const CarRentalEnquiryDetailsPage = lazy(()=>import("../admin/pages/car-rental-enquiry/CarRentalEnquiryDetailsPage"));

const AdminPayNowEnquiries = lazy(()=>import("../admin/pages/pay-now/AdminPayNowEnquiries"));
const AdminPayNowDetails = lazy(()=>import("../admin/pages/pay-now/AdminPayNowDetails"));
const AdminPayNowEdit = lazy(()=>import("../admin/pages/pay-now/AdminPayNowEdit"));

const AdminTourPackages = lazy(()=>import("../admin/pages/tour-package/AdminTourPackages"));
const AdminTourPackageCreate = lazy(()=>import("../admin/pages/tour-package/AdminTourPackageCreate"));
const AdminTourPackageDetails = lazy(()=>import("../admin/pages/tour-package/AdminTourPackageDetails"));
const AdminTourPackageEdit = lazy(()=>import("../admin/pages/tour-package/AdminTourPackageEdit"));

const AdminTourCategories = lazy(()=>import("../admin/pages/tour-category/AdminTourCategories"));
const AdminTourCategoryCreate = lazy(()=>import("../admin/pages/tour-category/AdminTourCategoryCreate"));
const AdminTourCategoryDetail = lazy(()=>import("../admin/pages/tour-category/AdminTourCategoryDetail"));
const AdminTourCategoryEdit = lazy(()=>import("../admin/pages/tour-category/AdminTourCategoryEdit"));

const AdminDestinations = lazy(()=>import("../admin/pages/destination/AdminDestinations"));
const AdminDestinationCreate = lazy(()=>import("../admin/pages/destination/AdminDestinationCreate"));
const AdminDestinationEdit = lazy(()=>import("../admin/pages/destination/AdminDestinationEdit"));
const AdminDestinationDetail = lazy(()=>import("../admin/pages/destination/AdminDestinationDetail"));

export default function AdminRoute(){
    return(
        <>
        <Suspense fallback={<AdminLoading/>}>
            <Routes>
                <Route path="login" element={<AdminLogin />}/> {/* checked */}
                            
                <Route element={<AdminLayout />}> {/* checked */}
                    
                    <Route path="dashboard" element={<AdminDashboard />}/> {/*checked*/}
                    
                    <Route path="tour-enquiries" element={<AdminTourEnquiries />}/> 
                    <Route path="tour-enquiries/:id" element={<AdminTourEnquiryDetails />} />
                    <Route path="tour-enquiries/:id/edit" element={<AdminTourEnquiryEdit />}/>

                    <Route path="pay-now" element={<AdminPayNowEnquiries />} />
                    <Route path="pay-now/:id" element={<AdminPayNowDetails />}/>
                    <Route path="pay-now/:id/edit" element={<AdminPayNowEdit />}/>
                    
                    <Route path="testimonials" element={<AdminTestimonials />}/>
                    <Route path="testimonials/create" element={<AdminCreateTestimonial />} />
                    <Route path="testimonials/:id" element={<AdminTestimonialsDetails />} />
                    
                    <Route path="blogs" element={<AdminBlogs />} />
                    <Route path="blogs/create" element={<AdminBlogCreate />} />
                    <Route path="blogs/:id" element={<AdminBlogDetails />} />
                    <Route path="blogs/:id/edit" element={<AdminBlogEdit />} />
                    
                    <Route path="home-hero" element={<AdminHomeHero />} />
                    <Route path="home-hero/create" element={<AdminHomeHeroCreate />} />
                    <Route path="home-hero/:id/edit" element={<AdminHomeHeroEdit />} />
                    
                    <Route path="admin-management" element={<AdminManagement />} /> {/*checked*/}
                    
                    <Route path="client-review-videos" element={<ClientReviewVideos />} />
                    
                    <Route path="client-gallery" element={<ClientGallery />} />
                    
                    <Route path="car-rental-enquiries" element={<CarRentalEnquiriesPage />} />
                    <Route path="/car-rental-enquiries/:id" element={<CarRentalEnquiryDetailsPage />}/>
                    
                    <Route path="tour-packages" element={<AdminTourPackages />}/> 
                    <Route path="tour-packages/create" element={<AdminTourPackageCreate />}/> 
                    <Route path="tour-packages/:id" element={<AdminTourPackageDetails />} /> 
                    <Route path="tour-packages/:id/edit" element={<AdminTourPackageEdit />} />
                    
                    <Route path="tour-categories" element={<AdminTourCategories />} />  {/*checked*/}
                    <Route path="tour-categories/create" element={<AdminTourCategoryCreate />} />  {/*checked*/}
                    <Route path="tour-categories/:id" element={<AdminTourCategoryDetail />} /> {/*checked*/}
                    <Route path="tour-categories/:id/edit" element={<AdminTourCategoryEdit />} /> {/*checked*/}
                    
                    <Route path="destinations" element={<AdminDestinations />} /> 
                    <Route path="destinations/create" element={<AdminDestinationCreate />} />
                    <Route path="destinations/:id/edit" element={<AdminDestinationEdit />} />
                    <Route path="destinations/:id" element={<AdminDestinationDetail />} /> 
                
                </Route>

                <Route path="*" element={<NotFound/>} />
            </Routes>
        </Suspense>

        </>
    )
}