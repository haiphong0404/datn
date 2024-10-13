import axios from "axios";


export const registerUser = async (register) => {
    return await axios.post('/register', register);
};


