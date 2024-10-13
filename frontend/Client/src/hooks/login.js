import axios from "axios";


export const loginUser = async (login) => {
    return await axios.post('/login', login);
};
