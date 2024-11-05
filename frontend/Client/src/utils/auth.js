
import { jwtDecode } from 'jwt-decode';

export const getUserFromToken = (token) => {
    if (!token) {
        throw new Error("No token provided");
    }

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken; 
    } catch (error) {
        throw new Error("Invalid token");
    }
};
