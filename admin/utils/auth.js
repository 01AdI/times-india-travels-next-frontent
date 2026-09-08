const ADMIN_TOKEN_KEY = "admin_token";
const ADMIN_DATA_KEY = "admin_data";

// ============================================================
// GET TOKEN
// ============================================================

export const getAdminToken = () => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

// ============================================================
// STORE AUTH DATA
// ============================================================

export const setAdminAuth = (token, admin) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);

  localStorage.setItem(
    ADMIN_DATA_KEY,
    JSON.stringify(admin)
  );
};

// ============================================================
// GET STORED ADMIN
// ============================================================

export const getStoredAdmin = () => {
  const admin = localStorage.getItem(ADMIN_DATA_KEY);

  if (!admin) {
    return null;
  }

  try {
    return JSON.parse(admin);
  } catch {
    return null;
  }
};

// ============================================================
// REMOVE AUTH DATA
// ============================================================

export const clearAdminAuth = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_DATA_KEY);
};

// ============================================================
// CHECK WHETHER TOKEN EXISTS
// ============================================================

export const isAdminLoggedIn = () => {
  return Boolean(getAdminToken());
};