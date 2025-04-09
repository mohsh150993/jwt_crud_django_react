import { BASE_URL} from './endpoints.jsx';

// 🔹 GET method (with token if available)
export const get = async  (url)  => {
    let headers = {
        "content-type" : "application/json",
    };

    const token = localStorage.getItem("token");
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${urls}`, {headers});

    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}`)
    }

    return response.json();
}; 


// POST method (pass is_token=true to send token, false to skip)
export const post = async (url, data, is_token = true) => {
    // definin gheaders for sending json data
    let headers = {
      "Content-Type": "application/json",       
    };
  
    // Get token from localStorage
    const token = localStorage.getItem("token");
  
    // Send token only if is_token is true and token is available
    if (is_token && token) {
      headers.Authorization = `Token ${token}`;
    }
  
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
  
    // If HTTP status is not 200–299. return the error message from server
    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }
  
    // Return the response JSON object on success
    return response.json();
  };
  
  