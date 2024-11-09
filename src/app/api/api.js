import axios from "axios";

// const API_URL = "https://batoreach-be.onrender.com";

// const API_URL = "https://bato-reach-be.vercel.app";

const API_URL = "http://localhost:8888";

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Registration failed");
  }
};

export const uploadAvatar = async (avatar, token) => {
  try {
    // Create a FormData object to hold the file
    const formData = new FormData();
    formData.append("avatar", avatar);
    // Make a POST request to upload the avatar
    const response = await axios.post(`${API_URL}/upload-avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    // Return the updated user details with the new avatar URL from Cloudinary
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Upload failed:", error.response.data.detail);
    } else {
      console.error("Error occurred during upload:", error.message);
    }
    throw error;
  }
};

export const login = async (usernameOrEmail, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/token`,
      {
        username: usernameOrEmail,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    // Set token type = Bearer and store the token in localStorage
    const { access_token } = response.data;
    console.log("Logged in successfully:", access_token);
    // Store the token in localStorage
    localStorage.setItem("token", access_token);
    return access_token;
  } catch (error) {
    if (error.response) {
      console.error("Login failed:", error.response.data.detail);
    } else {
      console.error("Error occurred during login:", error.message);
    }
  }
};

export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch user");
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error occurred during logout:", error.message);
  }
};

export const addYoutubeChannelID = async (channelId, authToken) => {
  try {
    const response = await axios.post(
      `${API_URL}/set_youtube_id`,
      {
        youtube_channel_id: channelId,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response data
    const data = response.data;
    console.log("YouTube Channel Info:", data);
    return data;
  } catch (error) {
    if (error.response) {
      // Request made and server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

export const create_video = async (videoData, username) => {
  try {
    const payload = username ? { ...videoData } : videoData;
    const response = await axios.post(
      `${API_URL}/videos/?username=${username}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Video creation failed:", error.response.data.detail);
    } else {
      console.error("Error occurred during video creation:", error.message);
    }
    throw error;
  }
};

export const create_audio = async (audioData, username) => {
  try {
    const payload = username ? { ...audioData } : audioData;
    const response = await axios.post(
      `${API_URL}/audios/?username=${username}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Audio creation failed:", error.response.data.detail);
    } else {
      console.error("Error occurred during audio creation:", error.message);
    }
    throw error;
  }
};

export const getVideos = async (videoId) => {
  try {
    const response = await axios.get(`${API_URL}/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error.response.data.detail);
    throw error;
  }
};

export const getVideosList = async (videoIds) => {
  try {
    // console.log("Requesting video list with IDs:", videoIds); // Debugging line
    const url = new URL(`${API_URL}/videos/list/`);
    videoIds.forEach(id => url.searchParams.append('video_ids', id));
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error fetching video list:", error.response?.data?.detail || error.message);
    throw error;
  }
};
