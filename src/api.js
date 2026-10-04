const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export function getSavedSession() {
  try {
    const user = JSON.parse(localStorage.getItem("foodshareUser"));
    const token = localStorage.getItem("foodshareToken");
    return user && token ? { user, token } : null;
  } catch {
    return null;
  }
}

export function saveSession(token, user) {
  localStorage.setItem("foodshareToken", token);
  localStorage.setItem("foodshareUser", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("foodshareToken");
  localStorage.removeItem("foodshareUser");
}

export async function api(path, options = {}) {
  const token = localStorage.getItem("foodshareToken");
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new Error(
      `FoodShare could not reach the backend at ${API_BASE}. Start the Spring Boot app and check that MySQL is running.`,
    );
  }

  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (response.status === 401 && path !== "/api/auth/login") {
    clearSession();
    throw new Error("Your session has expired. Please sign in again.");
  }

  if (!response.ok) {
    throw new Error(data.message || "That didn't work. Please try again.");
  }

  return data;
}
