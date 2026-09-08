import API_BASE_URL from "../utils/apiConfigPublic";


export const publicRequest = async (endpoint,options = {}) => {
  const headers = {...(options.headers || {}),};

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
};

// home hero 

export const getHomeHeroSlides = async () => {
  return publicRequest("/home-hero", {
    method: "GET",
  });
};

// clinet reviews video:
export const getClientReviewVideos = async () =>{
  return publicRequest("/client-review", {
     method: "GET" 
    });
};

// client testimonials:

export const getClientTestimonials = async () =>{
  return publicRequest("/testimonials", {
     method: "GET" 
    });
};

export const getDetailClientTestimonial = async (id) =>{
  return publicRequest(`/testimonials/${id}`, {
     method: "GET" 
    });
};

export const getHomePageTestimonials = async () =>{
  return publicRequest("/testimonials/homepage", {
     method: "GET" 
    });
};

// destination:

export const getDestination = async () =>{
  return publicRequest("/destination", {
     method: "GET" 
    });
};

export const getDestinationDetail = async (id) =>{
  return publicRequest(`/destination/${id}`, {
     method: "GET" 
    });
};
// tour-category:

export const getTourCategories = async () =>{
  return publicRequest("/tour-category", {
     method: "GET" 
    });
};

export const getTourCategoreisDetails = async (id) =>{
  return publicRequest(`/tour-category/${id}`, {
     method: "GET" 
    });
};



// tour-packages:

export const getTourPackages = async ({
  page = 1,
  limit = 20,
  mostLoved,
  specialPackage,
  categorySlug,
} = {}) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (mostLoved !== undefined) {
    params.set("mostLoved", String(mostLoved));
  }

  if (specialPackage !== undefined) {
    params.set("specialPackage", String(specialPackage));
  }

  if (categorySlug) {
    params.set("categorySlug", categorySlug.trim().toLowerCase());
  }

  return publicRequest(`/tour-package?${params.toString()}`, {
    method: "GET",
  });
};

export const getTourPackagesDropDown = async () =>{
  return publicRequest("/tour-package/dropdown", {
     method: "GET" 
    });
};

export const getDetailTourPackages = async (id) =>{
  return publicRequest(`/tour-package/${id}`, {
     method: "GET" 
    });
};

// form submit:

export const createTourEnquiry = async (data) =>{
  return publicRequest("/tour-enquiry/create", {
     method: "Post" ,
     body: JSON.stringify(data),
    });
};

//testimonial submit:

export const createTestimonial = async (data) => {
  return publicRequest("/testimonials/create", {
    method: "POST",
    body: data,
  });
};
// car rental submit:

export const createCarEnquary = async (data) =>{
  return publicRequest("/car-rental-enquiry/create", {
     method: "Post" ,
     body: JSON.stringify(data),
    });
};

// pay now submit:

export const createPayNowEnquiry = async (data) => {
  return publicRequest("/pay-now/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// client gallery

export const getClinetGalleyAboutUS = async () =>{
  return publicRequest("/client-gallery", {
     method: "GET" 
    });
};

// blogs:

export const getBlogs = async (page = 1, limit = 10) => {
  return publicRequest(`/blog?page=${page}&limit=${limit}`, {
    method: "GET",
  });
};

export const getBlogBySlug = async (slug) => {
  if (!slug) {
    throw new Error("Blog slug is required.");
  }

  return publicRequest(`/blog/${encodeURIComponent(slug)}`, {
    method: "GET",
  });
};