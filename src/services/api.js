
import axios from "axios";

// const API_URL = "http://localhost:5500/api/v1/auth";
// const API_OLIVES_URL = "http://localhost:5500/api/v1/olives";

// const API_URL = "https://olive-api.onrender.com/api/v1/auth";
const API_OLIVES_URL = "https://olive-api.onrender.com/api/v1/olives";

// export const signUp = async (userData) => {
//     return axios.post(`${API_URL}/sign-up`, userData);
// };

// export const signIn = async (credentials) => {
//     return axios.post(`${API_URL}/sign-in`, credentials);
// };

export const getOlives = async (token) => {
    return axios.get(API_OLIVES_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const addOlive = async (token, oliveData) => {
  return axios.post(API_OLIVES_URL, oliveData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
