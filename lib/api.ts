const BASE_URL = "http://localhost:3000";

export const register = async (userData: any) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export const login = async (credentials: any) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token); // Assuming the token is returned as { token: "..." }
  return data;
};

export const apiRequest = async (endpoint: string, method: string = "GET", data?: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}/api${endpoint}`, config);

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access (e.g., token invalid)
      localStorage.removeItem("token");
      // Redirect to login or display an error
      throw new Error("Unauthorized");
    }
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};