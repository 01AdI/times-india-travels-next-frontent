import {
  getAdminToken,
  setAdminAuth,
  clearAdminAuth,
} from "../utils/auth";
import API_BASE_URL from "../utils/apiConfig";

export const adminRequest = async (endpoint, options = {}) => {
  const token = getAdminToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearAdminAuth();

    window.location.href = "/admin/login";

    throw new Error("Your admin session has expired.");
  }

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

export const adminLogin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid email or password.");
  }

  setAdminAuth(data.token, data.admin);
  return data;
};

export const getCurrentAdmin = async () => adminRequest("/admin/me");

export const adminLogout = async () => {
  try {
    return await adminRequest("/admin/logout", { method: "POST" });
  } finally {
    clearAdminAuth();
  }
};

export const getAdmins = async () =>
  adminRequest("/admin/admins", { method: "GET" });

export const createAdmin = async ({ name, email, password }) => {
  if (!name?.trim()) throw new Error("Admin name is required.");
  if (!email?.trim()) throw new Error("Admin email is required.");
  if (!password) throw new Error("Admin password is required.");

  return adminRequest("/admin/create", {
    method: "POST",
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    }),
  });
};

export const updateAdmin = async (id, { name, email, password }) => {
  if (!id) throw new Error("Admin ID is required.");

  const body = {};

  if (name !== undefined) {
    if (!name.trim()) throw new Error("Admin name cannot be empty.");
    body.name = name.trim();
  }

  if (email !== undefined) {
    if (!email.trim()) throw new Error("Admin email cannot be empty.");
    body.email = email.trim().toLowerCase();
  }

  if (password !== undefined) {
    if (!password.trim()) throw new Error("Password cannot be empty.");

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    body.password = password;
  }

  return adminRequest(`/admin/admins/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

export const deleteAdmin = async (id) => {
  if (!id) throw new Error("Admin ID is required.");

  return adminRequest(`/admin/admins/${id}`, {
    method: "DELETE",
  });
};

export const getTourEnquiries = async ({
  page = 1,
  limit = 20,
  status = "",
  riskLevel = "",
  search = "",
} = {}) => {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (status) params.append("status", status);
  if (riskLevel) params.append("riskLevel", riskLevel);
  if (search.trim()) params.append("search", search.trim());

  return adminRequest(`/tour-enquiry/admin?${params.toString()}`);
};

export const getTourEnquiry = async (id) => {
  if (!id) throw new Error("Tour enquiry ID is required.");

  return adminRequest(`/tour-enquiry/admin/${id}`);
};

export const updateTourEnquiry = async (id, enquiryData) => {
  if (!id) throw new Error("Tour enquiry ID is required.");

  if (!enquiryData || typeof enquiryData !== "object") {
    throw new Error("Enquiry data is required.");
  }

  return adminRequest(`/tour-enquiry/admin/${id}`, {
    method: "PATCH",
    body: JSON.stringify(enquiryData),
  });
};

export const updateTourEnquiryStatus = async (id, status) => {
  if (!id) throw new Error("Tour enquiry ID is required.");
  if (!status) throw new Error("Enquiry status is required.");

  return adminRequest(`/tour-enquiry/admin/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

export const updateTourEnquiryRisk = async (
  id,
  riskLevel,
  riskReason = ""
) => {
  if (!id) throw new Error("Tour enquiry ID is required.");
  if (!riskLevel) throw new Error("Risk level is required.");

  return adminRequest(`/tour-enquiry/admin/${id}/risk`, {
    method: "PATCH",
    body: JSON.stringify({
      riskLevel,
      riskReason,
    }),
  });
};

export const updateTourEnquiryNotes = async (id, adminNotes) => {
  if (!id) throw new Error("Tour enquiry ID is required.");

  return adminRequest(`/tour-enquiry/admin/${id}/notes`, {
    method: "PATCH",
    body: JSON.stringify({
      adminNotes: adminNotes === undefined ? null : adminNotes,
    }),
  });
};

export const deleteTourEnquiry = async (id) => {
  if (!id) throw new Error("Tour enquiry ID is required.");

  return adminRequest(`/tour-enquiry/admin/${id}`, {
    method: "DELETE",
  });
};

export const getDashboardStats = async () =>
  adminRequest("/tour-enquiry/admin/dashboard/stats");

export const createAdminTestimonial = async ({
  name,
  location,
  avatar,
  avatarUrl,
  review,
  rating,
  accent,
  verified,
  source,
  featuredOnHomepage,
  status,
}) => {
  const formData = new FormData();

  formData.append("name", name || "");
  formData.append("review", review || "");
  formData.append("rating", rating ?? "");

  if (location !== undefined) {
    formData.append("location", location || "");
  }

  if (avatarUrl !== undefined) {
    formData.append("avatarUrl", avatarUrl || "");
  }

  if (accent !== undefined) {
    formData.append("accent", accent || "blue");
  }

  if (source !== undefined) {
    formData.append("source", source || "customer");
  }

  if (status !== undefined) {
    formData.append("status", status || "approved");
  }

  formData.append(
    "verified",
    verified ? "true" : "false"
  );

  formData.append(
    "featuredOnHomepage",
    featuredOnHomepage ? "true" : "false"
  );

  if (avatar instanceof File) {
    formData.append("avatar", avatar);
  }

  return adminRequest("/testimonials/admin/create", {
    method: "POST",
    body: formData,
  });
};

export const getAdminTestimonials = async () =>
  adminRequest("/testimonials/admin");

export const getAdminTestimonial = async (id) =>
  adminRequest(`/testimonials/admin/${id}`);

export const approveTestimonial = async (id) =>
  adminRequest(`/testimonials/admin/${id}/approve`, {
    method: "PATCH",
  });

export const rejectTestimonial = async (id) =>
  adminRequest(`/testimonials/admin/${id}/reject`, {
    method: "PATCH",
  });

export const featureTestimonial = async (
  id,
  featuredOnHomepage
) =>
  adminRequest(`/testimonials/admin/${id}/feature`, {
    method: "PATCH",
    body: JSON.stringify({
      featuredOnHomepage,
    }),
  });

export const deleteTestimonial = async (id) =>
  adminRequest(`/testimonials/admin/${id}`, {
    method: "DELETE",
  });

export const createAdminBlog = async ({
  title,
  slug,
  image,
  shortDescription,
  content,
  category,
  tags,
  author,
  status,
  featured,
}) => {
  const formData = new FormData();

  formData.append("title", title || "");
  formData.append("slug", slug || "");
  formData.append("shortDescription", shortDescription || "");
  formData.append("content", content || "");

  if (image instanceof File) {
    formData.append("image", image);
  } else if (typeof image === "string" && image.trim()) {
    formData.append("image", image.trim());
  }

  if (category !== undefined) {
    formData.append("category", category || "");
  }

  if (author !== undefined) {
    formData.append("author", author || "");
  }

  if (status !== undefined) {
    formData.append("status", status || "draft");
  }

  if (Array.isArray(tags)) {
    formData.append("tags", tags.join(","));
  } else if (typeof tags === "string") {
    formData.append("tags", tags);
  }

  formData.append(
    "featured",
    featured ? "true" : "false"
  );

  return adminRequest("/blog/admin/create", {
    method: "POST",
    body: formData,
  });
};

export const getAdminBlogs = async ({
  page = 1,
  limit = 10,
  status,
} = {}) => {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (status && status !== "all") {
    params.append("status", status);
  }

  return adminRequest(`/blog/admin?${params.toString()}`, {
    method: "GET",
  });
};

export const getAdminBlog = async (id) => {
  if (!id) throw new Error("Blog ID is required.");

  return adminRequest(`/blog/admin/${id}`, {
    method: "GET",
  });
};

export const updateAdminBlog = async (
  id,
  {
    title,
    slug,
    image,
    shortDescription,
    content,
    category,
    tags,
    author,
    status,
    featured,
  }
) => {
  if (!id) throw new Error("Blog ID is required.");

  const formData = new FormData();

  if (title !== undefined) {
    formData.append("title", title || "");
  }

  if (slug !== undefined) {
    formData.append("slug", slug || "");
  }

  if (shortDescription !== undefined) {
    formData.append(
      "shortDescription",
      shortDescription || ""
    );
  }

  if (content !== undefined) {
    formData.append("content", content || "");
  }

  if (category !== undefined) {
    formData.append("category", category || "");
  }

  if (author !== undefined) {
    formData.append("author", author || "");
  }

  if (status !== undefined) {
    formData.append("status", status || "draft");
  }

  if (tags !== undefined) {
    formData.append(
      "tags",
      Array.isArray(tags)
        ? tags.join(",")
        : tags || ""
    );
  }

  if (featured !== undefined) {
    formData.append(
      "featured",
      featured ? "true" : "false"
    );
  }

  if (image instanceof File) {
    formData.append("image", image);
  } else if (
    typeof image === "string" &&
    image.trim()
  ) {
    formData.append("image", image.trim());
  }

  return adminRequest(`/blog/admin/${id}`, {
    method: "PATCH",
    body: formData,
  });
};

export const deleteAdminBlog = async (id) => {
  if (!id) throw new Error("Blog ID is required.");

  return adminRequest(`/blog/admin/${id}`, {
    method: "DELETE",
  });
};

export const createAdminHero = async ({
  place,
  line,
  mediaType,
  media,
  mediaUrl,
  active,
  order,
}) => {
  const formData = new FormData();

  formData.append("place", place || "");
  formData.append("line", line || "");
  formData.append(
    "mediaType",
    mediaType || "image"
  );

  if (media instanceof File) {
    formData.append("media", media);
  }

  if (
    typeof mediaUrl === "string" &&
    mediaUrl.trim()
  ) {
    formData.append(
      "mediaUrl",
      mediaUrl.trim()
    );
  }

  formData.append(
    "active",
    active ? "true" : "false"
  );

  formData.append("order", order ?? 0);

  return adminRequest("/home-hero/admin/create", {
    method: "POST",
    body: formData,
  });
};

export const getAdminHeroes = async () =>
  adminRequest("/home-hero/admin", {
    method: "GET",
  });

export const getAdminHero = async (id) => {
  if (!id) {
    throw new Error("Hero slide ID is required.");
  }

  return adminRequest(`/home-hero/admin/${id}`, {
    method: "GET",
  });
};

export const updateAdminHero = async (
  id,
  {
    place,
    line,
    mediaType,
    media,
    mediaUrl,
    active,
    order,
  }
) => {
  if (!id) {
    throw new Error("Hero slide ID is required.");
  }

  const formData = new FormData();

  if (place !== undefined) {
    formData.append("place", place || "");
  }

  if (line !== undefined) {
    formData.append("line", line || "");
  }

  if (mediaType !== undefined) {
    formData.append(
      "mediaType",
      mediaType || "image"
    );
  }

  if (media instanceof File) {
    formData.append("media", media);
  }

  if (
    mediaUrl !== undefined &&
    typeof mediaUrl === "string"
  ) {
    formData.append("mediaUrl", mediaUrl);
  }

  if (active !== undefined) {
    formData.append(
      "active",
      active ? "true" : "false"
    );
  }

  if (order !== undefined && order !== null) {
    formData.append("order", order);
  }

  return adminRequest(`/home-hero/admin/${id}`, {
    method: "PATCH",
    body: formData,
  });
};

export const deleteAdminHero = async (id) => {
  if (!id) {
    throw new Error("Hero slide ID is required.");
  }

  return adminRequest(`/home-hero/admin/${id}`, {
    method: "DELETE",
  });
};

export const getHomeHeroSlides = async () => {
  const response = await fetch(
    `${API_BASE_URL}/home-hero`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to load home hero slides."
    );
  }

  return data;
};

export const getAdminClientReviewVideos = async () =>
  adminRequest("/client-review/admin", {
    method: "GET",
  });

export const createClientReviewVideo = async ({
  name,
  location,
  tour,
  video,
  active = true,
}) => {
  if (!name?.trim()) {
    throw new Error("Client name is required.");
  }

  if (!location?.trim()) {
    throw new Error("Client location is required.");
  }

  if (
    !video ||
    (typeof video === "string" && !video.trim())
  ) {
    throw new Error(
      "Client review video is required."
    );
  }

  const formData = new FormData();

  formData.append("name", name.trim());
  formData.append("location", location.trim());

  if (tour !== undefined) {
    formData.append(
      "tour",
      tour?.trim() || ""
    );
  }

  if (video instanceof File) {
    formData.append("video", video);
  } else if (
    typeof video === "string" &&
    video.trim()
  ) {
    formData.append(
      "video",
      video.trim()
    );
  }

  formData.append(
    "active",
    active ? "true" : "false"
  );

  return adminRequest(
    "/client-review/admin/create",
    {
      method: "POST",
      body: formData,
    }
  );
};

export const updateClientReviewVideo = async (
  id,
  {
    name,
    location,
    tour,
    video,
    active,
  }
) => {
  if (!id) {
    throw new Error(
      "Client review video ID is required."
    );
  }

  const formData = new FormData();

  if (name !== undefined) {
    formData.append("name", name || "");
  }

  if (location !== undefined) {
    formData.append(
      "location",
      location || ""
    );
  }

  if (tour !== undefined) {
    formData.append("tour", tour || "");
  }

  if (video instanceof File) {
    formData.append("videoFile", video);
  } else if (
    typeof video === "string" &&
    video.trim()
  ) {
    formData.append(
      "video",
      video.trim()
    );
  }

  if (active !== undefined) {
    formData.append(
      "active",
      active ? "true" : "false"
    );
  }

  return adminRequest(
    `/client-review/admin/${id}`,
    {
      method: "PATCH",
      body: formData,
    }
  );
};

export const deleteClientReviewVideo = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Client review video ID is required."
    );
  }

  return adminRequest(
    `/client-review/admin/${id}`,
    {
      method: "DELETE",
    }
  );
};

export const getAdminClientGallery = async () =>
  adminRequest("/client-gallery/admin");

export const createClientGallery = async ({
  image,
  title,
  place,
  active,
}) => {
  const formData = new FormData();

  if (image instanceof File) {
    formData.append("image", image);
  } else if (
    typeof image === "string" &&
    image.trim()
  ) {
    formData.append(
      "image",
      image.trim()
    );
  }

  if (title !== undefined) {
    formData.append("title", title);
  }

  if (place !== undefined) {
    formData.append("place", place);
  }

  formData.append(
    "active",
    String(active)
  );

  return adminRequest(
    "/client-gallery/admin/create",
    {
      method: "POST",
      body: formData,
    }
  );
};

export const updateClientGallery = async (
  id,
  {
    image,
    title,
    place,
    active,
  }
) => {
  const formData = new FormData();

  if (image instanceof File) {
    formData.append("image", image);
  } else if (
    typeof image === "string" &&
    image.trim()
  ) {
    formData.append(
      "image",
      image.trim()
    );
  }

  if (title !== undefined) {
    formData.append("title", title);
  }

  if (place !== undefined) {
    formData.append("place", place);
  }

  if (active !== undefined) {
    formData.append(
      "active",
      String(active)
    );
  }

  return adminRequest(
    `/client-gallery/admin/${id}`,
    {
      method: "PATCH",
      body: formData,
    }
  );
};

export const deleteClientGallery = async (id) =>
  adminRequest(
    `/client-gallery/admin/${id}`,
    {
      method: "DELETE",
    }
  );

export const getCarRentalEnquiries = async ({
  page = 1,
  limit = 20,
  status,
  riskLevel,
  search,
} = {}) => {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (status) {
    params.append("status", status);
  }

  if (riskLevel) {
    params.append(
      "riskLevel",
      riskLevel
    );
  }

  if (search?.trim()) {
    params.append(
      "search",
      search.trim()
    );
  }

  return adminRequest(
    `/car-rental-enquiry/admin?${params.toString()}`
  );
};

export const getCarRentalEnquiry = async (id) =>
  adminRequest(
    `/car-rental-enquiry/admin/${id}`
  );

export const updateCarRentalEnquiry = async (
  id,
  data
) =>
  adminRequest(
    `/car-rental-enquiry/admin/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );

export const updateCarRentalStatus = async (
  id,
  status
) =>
  adminRequest(
    `/car-rental-enquiry/admin/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    }
  );

export const updateCarRentalRisk = async (
  id,
  riskLevel,
  riskReason = ""
) =>
  adminRequest(
    `/car-rental-enquiry/admin/${id}/risk`,
    {
      method: "PATCH",
      body: JSON.stringify({
        riskLevel,
        riskReason,
      }),
    }
  );

export const updateCarRentalNotes = async (
  id,
  adminNotes
) =>
  adminRequest(
    `/car-rental-enquiry/admin/${id}/notes`,
    {
      method: "PATCH",
      body: JSON.stringify({
        adminNotes,
      }),
    }
  );

export const deleteCarRentalEnquiry = async (
  id
) =>
  adminRequest(
    `/car-rental-enquiry/admin/${id}`,
    {
      method: "DELETE",
    }
  );

export const getCarRentalDashboardStats =
  async () =>
    adminRequest(
      "/car-rental-enquiry/admin/dashboard/stats"
    );

export const getAdminTourPackages = async ({
  page = 1,
  limit = 20,
  categorySlug = "",
  mostLoved,
  specialPackage,
} = {}) => {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (categorySlug) {
    params.append(
      "categorySlug",
      categorySlug
    );
  }

  if (mostLoved !== undefined) {
    params.append(
      "mostLoved",
      String(mostLoved)
    );
  }

  if (specialPackage !== undefined) {
    params.append(
      "specialPackage",
      String(specialPackage)
    );
  }

  return adminRequest(
    `/tour-package?${params.toString()}`
  );
};

export const getAdminTourPackage = async (
  id
) =>
  adminRequest(
    `/tour-package/${id}`
  );

export const createAdminTourPackage = async (
  formData
) =>
  adminRequest(
    "/tour-package/create",
    {
      method: "POST",
      body: formData,
    }
  );

export const updateAdminTourPackage = async (
  id,
  formData
) =>
  adminRequest(
    `/tour-package/edit/${id}`,
    {
      method: "PUT",
      body: formData,
    }
  );

export const deleteAdminTourPackage = async (
  id
) =>
  adminRequest(
    `/tour-package/delete/${id}`,
    {
      method: "DELETE",
    }
  );

export const getAdminTourCategories = async () =>
  adminRequest("/tour-category", {
    method: "GET",
  });

export const getAdminTourCategory = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Tour category ID is required."
    );
  }

  return adminRequest(
    `/tour-category/${id}`,
    {
      method: "GET",
    }
  );
};

export const createAdminTourCategory = async ({
  id,
  name,
  tagline,
  description,
  showInNavbar,
  showInExplore,
  heroImage,
  destinations = [],
  galleryImages = [],
  galleryCaptions = [],
}) => {
  if (!id?.trim()) {
    throw new Error(
      "Tour category ID is required."
    );
  }

  if (!name?.trim()) {
    throw new Error(
      "Tour category name is required."
    );
  }

  if (!tagline?.trim()) {
    throw new Error(
      "Tour category tagline is required."
    );
  }

  if (!description?.trim()) {
    throw new Error(
      "Tour category description is required."
    );
  }

  const formData = new FormData();

  formData.append(
    "id",
    id.trim().toLowerCase()
  );

  formData.append(
    "name",
    name.trim()
  );

  formData.append(
    "tagline",
    tagline.trim()
  );

  formData.append(
    "description",
    description.trim()
  );

  formData.append(
    "showInNavbar",
    showInNavbar ? "true" : "false"
  );

  formData.append(
    "showInExplore",
    showInExplore ? "true" : "false"
  );

  formData.append(
    "destinations",
    JSON.stringify(
      Array.isArray(destinations)
        ? destinations
        : []
    )
  );

  if (heroImage instanceof File) {
    formData.append(
      "heroImage",
      heroImage
    );
  } else if (
    typeof heroImage === "string" &&
    heroImage.trim()
  ) {
    formData.append(
      "heroImage",
      heroImage.trim()
    );
  }

  if (Array.isArray(galleryImages)) {
    galleryImages.forEach((image) => {
      if (image instanceof File) {
        formData.append(
          "galleryImages",
          image
        );
      }
    });
  }

  formData.append(
    "galleryCaptions",
    JSON.stringify(
      Array.isArray(galleryCaptions)
        ? galleryCaptions
        : []
    )
  );

  return adminRequest(
    "/tour-category/create",
    {
      method: "POST",
      body: formData,
    }
  );
};

export const updateAdminTourCategory = async (
  id,
  {
    name,
    tagline,
    description,
    showInNavbar,
    showInExplore,
    heroImage,
    destinations,
    galleryImages,
    galleryCaptions,
    removeGalleryImageIds,
  } = {}
) => {
  if (!id) {
    throw new Error(
      "Tour category ID is required."
    );
  }

  const formData = new FormData();

  if (name !== undefined) {
    formData.append(
      "name",
      name || ""
    );
  }

  if (tagline !== undefined) {
    formData.append(
      "tagline",
      tagline || ""
    );
  }

  if (description !== undefined) {
    formData.append(
      "description",
      description || ""
    );
  }

  if (showInNavbar !== undefined) {
    formData.append(
      "showInNavbar",
      showInNavbar ? "true" : "false"
    );
  }

  if (showInExplore !== undefined) {
    formData.append(
      "showInExplore",
      showInExplore ? "true" : "false"
    );
  }

  if (destinations !== undefined) {
    formData.append(
      "destinations",
      JSON.stringify(
        Array.isArray(destinations)
          ? destinations
          : []
      )
    );
  }

  if (heroImage instanceof File) {
    formData.append(
      "heroImage",
      heroImage
    );
  } else if (
    typeof heroImage === "string"
  ) {
    formData.append(
      "heroImage",
      heroImage
    );
  }

  if (Array.isArray(galleryImages)) {
    galleryImages.forEach((image) => {
      if (image instanceof File) {
        formData.append(
          "galleryImages",
          image
        );
      }
    });
  }

  if (galleryCaptions !== undefined) {
    formData.append(
      "galleryCaptions",
      JSON.stringify(
        Array.isArray(galleryCaptions)
          ? galleryCaptions
          : []
      )
    );
  }

  if (removeGalleryImageIds !== undefined) {
    formData.append(
      "removeGalleryImageIds",
      JSON.stringify(
        Array.isArray(
          removeGalleryImageIds
        )
          ? removeGalleryImageIds
          : []
      )
    );
  }

  return adminRequest(
    `/tour-category/edit/${id}`,
    {
      method: "PUT",
      body: formData,
    }
  );
};

export const updateTourCategoryGalleryCaption =
  async (
    categoryId,
    imageId,
    caption
  ) => {
    if (!categoryId) {
      throw new Error(
        "Tour category ID is required."
      );
    }

    if (!imageId) {
      throw new Error(
        "Gallery image ID is required."
      );
    }

    if (typeof caption !== "string") {
      throw new Error(
        "Gallery caption must be a string."
      );
    }

    return adminRequest(
      `/tour-category/${categoryId}/gallery/${imageId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          caption: caption.trim(),
        }),
      }
    );
  };

export const deleteAdminTourCategory = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Tour category ID is required."
    );
  }

  return adminRequest(
    `/tour-category/delete/${id}`,
    {
      method: "DELETE",
    }
  );
};

export const getAdminDestinations = async () =>
  adminRequest("/destination", {
    method: "GET",
  });

export const getAdminDestination = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Destination ID is required."
    );
  }

  return adminRequest(
    `/destination/${id}`,
    {
      method: "GET",
    }
  );
};

export const createAdminDestination = async ({
  id,
  name,
  tagline,
  description,
  heroImage,
}) => {
  if (!id?.trim()) {
    throw new Error(
      "Destination ID is required."
    );
  }

  if (!name?.trim()) {
    throw new Error(
      "Destination name is required."
    );
  }

  if (!tagline?.trim()) {
    throw new Error(
      "Destination tagline is required."
    );
  }

  if (!description?.trim()) {
    throw new Error(
      "Destination description is required."
    );
  }

  const formData = new FormData();

  formData.append(
    "id",
    id.trim().toLowerCase()
  );

  formData.append(
    "name",
    name.trim()
  );

  formData.append(
    "tagline",
    tagline.trim()
  );

  formData.append(
    "description",
    description.trim()
  );

  if (heroImage instanceof File) {
    formData.append(
      "heroImage",
      heroImage
    );
  } else if (
    typeof heroImage === "string" &&
    heroImage.trim()
  ) {
    formData.append(
      "heroImage",
      heroImage.trim()
    );
  }

  return adminRequest(
    "/destination/create",
    {
      method: "POST",
      body: formData,
    }
  );
};

export const updateAdminDestination = async (
  id,
  {
    name,
    tagline,
    description,
    heroImage,
  } = {}
) => {
  if (!id) {
    throw new Error(
      "Destination ID is required."
    );
  }

  const formData = new FormData();

  if (name !== undefined) {
    formData.append(
      "name",
      name || ""
    );
  }

  if (tagline !== undefined) {
    formData.append(
      "tagline",
      tagline || ""
    );
  }

  if (description !== undefined) {
    formData.append(
      "description",
      description || ""
    );
  }

  if (heroImage instanceof File) {
    formData.append(
      "heroImage",
      heroImage
    );
  } else if (
    typeof heroImage === "string"
  ) {
    formData.append(
      "heroImage",
      heroImage
    );
  }

  return adminRequest(
    `/destination/edit/${id}`,
    {
      method: "PUT",
      body: formData,
    }
  );
};

export const deleteAdminDestination = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Destination ID is required."
    );
  }

  return adminRequest(
    `/destination/delete/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ============================================================
// PAY NOW ENQUIRIES
// ============================================================

export const getPayNowEnquiries = async ({
  page = 1,
  limit = 20,
  status = "",
  riskLevel = "",
  search = "",
} = {}) => {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (status) {
    params.append("status", status);
  }

  if (riskLevel) {
    params.append("riskLevel", riskLevel);
  }

  if (search?.trim()) {
    params.append("search", search.trim());
  }

  return adminRequest(
    `/pay-now/admin?${params.toString()}`,
    {
      method: "GET",
    }
  );
};


export const getPayNowEnquiry = async (id) => {
  if (!id) {
    throw new Error(
      "Pay Now enquiry ID is required."
    );
  }

  return adminRequest(
    `/pay-now/admin/${id}`,
    {
      method: "GET",
    }
  );
};


export const updatePayNowEnquiry = async (
  id,
  enquiryData
) => {
  if (!id) {
    throw new Error(
      "Pay Now enquiry ID is required."
    );
  }

  if (
    !enquiryData ||
    typeof enquiryData !== "object"
  ) {
    throw new Error(
      "Pay Now enquiry data is required."
    );
  }

  return adminRequest(
    `/pay-now/admin/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(
        enquiryData
      ),
    }
  );
};


export const updatePayNowEnquiryStatus = async (
  id,
  status
) => {
  if (!id) {
    throw new Error(
      "Pay Now enquiry ID is required."
    );
  }

  if (!status) {
    throw new Error(
      "Pay Now enquiry status is required."
    );
  }

  return adminRequest(
    `/pay-now/admin/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    }
  );
};


export const updatePayNowEnquiryRisk = async (
  id,
  riskLevel,
  riskReason = ""
) => {
  if (!id) {
    throw new Error(
      "Pay Now enquiry ID is required."
    );
  }

  if (!riskLevel) {
    throw new Error(
      "Risk level is required."
    );
  }

  return adminRequest(
    `/pay-now/admin/${id}/risk`,
    {
      method: "PATCH",
      body: JSON.stringify({
        riskLevel,
        riskReason,
      }),
    }
  );
};


export const updatePayNowEnquiryNotes = async (
  id,
  adminNotes
) => {
  if (!id) {
    throw new Error(
      "Pay Now enquiry ID is required."
    );
  }

  return adminRequest(
    `/pay-now/admin/${id}/notes`,
    {
      method: "PATCH",
      body: JSON.stringify({
        adminNotes:
          adminNotes === undefined
            ? null
            : adminNotes,
      }),
    }
  );
};


export const deletePayNowEnquiry = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Pay Now enquiry ID is required."
    );
  }

  return adminRequest(
    `/pay-now/admin/${id}`,
    {
      method: "DELETE",
    }
  );
};


export const getPayNowDashboardStats =
  async () =>
    adminRequest(
      "/pay-now/admin/dashboard/stats",
      {
        method: "GET",
      }
    );