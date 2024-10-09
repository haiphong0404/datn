import axios from "axios";
const patchApi = "http://127.0.0.1:8000/api/";

export const getStore = () => {
    return axios.get(patchApi + "users/api/users");
} 