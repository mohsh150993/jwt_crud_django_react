import { BASE_URL} from './endpoints.jsx';

// Function to refresh access token
const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token");

    if (!refresh) return null;

    try {
        const response = await fetch(`${BASE_URL}/accounts/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: JSON.parse(refresh) }),
        });

        if (!response.ok) throw new Error("Refresh failed");

        const data = await response.json();

        localStorage.setItem("token", JSON.stringify(data.access));
        return data.access;

    } catch (error) {
        console.error("Token refresh error:", error);
        return null;
    }
};

// GET method (with token if available) and token refresh retry

export const get = async  (url, retry = true)  => {
    let headers = {"content-type" : "application/json",};
    const token = localStorage.getItem("token");

    if (token) {
      headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    // making request to backend
    const response = await fetch(`${BASE_URL}${urls}`, {headers});

    // If 401, try refreshing token and retrying request
    if (response.status === 401 && retry) {
      const newToken = await refreshToken();

      if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
          response = await fetch(`${BASE_URL}${url}`, { headers });
      }
  }

    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}`)
    }

    return response.json();
}; 


// POST method (pass is_token=true to send token, false to skip) and with token refresh retry
export const post = async (url, data, is_token = true, retry = true) => {
    // definin gheaders for sending json data
    let headers = {"Content-Type": "application/json",};
    const token = localStorage.getItem("token");  // Get token from localStorage

  
    // Send token only if is_token is true and token is available
    if (is_token && token) {
      headers.Authorization = `Bearer ${JSON.parse(token)}`; 
    }

    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    // Refresh token and retry logic
    if (response.status === 401 && retry) {
      const newToken = await refreshToken();

      if (newToken) {
          localStorage.setItem("token", JSON.stringify(newToken));
          headers.Authorization = `Bearer ${newToken}`;

          response = await fetch(`${BASE_URL}${url}`, {
              method: "POST",
              headers,
              body: JSON.stringify(data),
          });
      }
    }
  
    // If HTTP status is not 200–299. return the error message from server
    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }
  
    // Return the response JSON object on success
    return response.json();
  };
  
  