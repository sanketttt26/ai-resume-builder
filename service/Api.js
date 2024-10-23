import axios from "axios";
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
console.log("API Key:", API_KEY); // Add this to check if the key is present
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);
const GetUserResume = (userEmail) =>
  axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + userEmail);

const UpdateUserResume = (id, data) =>
  axiosClient.put("/user-resumes/" + id, data);
export default { CreateNewResume, GetUserResume, UpdateUserResume };
