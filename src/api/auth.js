import axios from "axios";
import instance from ".";
import { jwtDecode } from "jwt-decode";

const login = async (username, password) => {
  // Client-side validation can be added here if necessary
  const response = await axios.post("http://localhost:8000/api/user/signin", {
    username,
    password,
  });
  if (response.data?.token) {
    storeToken(response.data.token);
  }

  // Return the response data for further processing if needed
  return response.data;
};

const register = async (username, password, image) => {
  try {
    const newUser = {
      username,
      password,
      image,
    };
    const formData = new FormData();

    for (let key in newUser) {
      formData.append(key, newUser[key]);
    }

    const response = await instance.post("/user/signup", formData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

const storeToken = (token) => {
  // Consider security implications when using localStorage for storing tokens
  localStorage.setItem("token", token);
};

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  return false;
};

const logout = () => {
  // Clear all relevant authentication data
  // console.log("logout function");
  localStorage.removeItem("token");
  // Update any state or context if used for managing authentication state
};

const getMyProfile = async () => {
  const { data } = await instance.get("/user/profile");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/user");
  return data;
};

const createARecipe = async (
  title,
  shortDescription,
  description,
  imageFile,
  categoryId,
  ingredients
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("shortDescription", shortDescription);
  formData.append("description", description);
  formData.append("image", imageFile);
  ingredients.forEach((ingredientId) => {
    formData.append("ingredients", ingredientId); // Append each ingredient ID
  });

  if (checkToken()) {
    const token = localStorage.getItem("token");
    const { data } = await instance.post(
      `/user/recipe/${categoryId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token
        },
      }
    );
    return data;
  } else {
    throw new Error("Authentication token is invalid or expired.");
  }
};

const getMyRecipes = async () => {
  const { data } = await instance.get("/user/myRecipe");
  return data;
};

export {
  login,
  register,
  getMyProfile,
  getAllUsers,
  checkToken,
  storeToken,
  logout,
  createARecipe,
  getMyRecipes,
};
