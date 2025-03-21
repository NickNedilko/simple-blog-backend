import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const { SECRET_KEY_TOKEN } = process.env;

 export const createToken = (payload) =>  jwt.sign(payload, SECRET_KEY_TOKEN, { expiresIn: "23h" })
    

export const verifyToken = token => {
    try {
       const payload = jwt.verify(token, SECRET_KEY_TOKEN);
       return {error: null, payload};
    }
    catch(error) {
        return {error, payload: null};
    }
};


