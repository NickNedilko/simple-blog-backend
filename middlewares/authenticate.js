import UserModel from '../models/User.js';
import { verifyToken } from '../utils/jwt.js';
import { HttpError } from '../utils/httpError.js';



export const authenticate = async (req, res, next) => {
   const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
        next(HttpError(401, "Not authorized"));
    }

    try {
        const { payload } = verifyToken(token);
        const user = await UserModel.findById(payload._id).select(-'password');
       
        
        if (!user || !user.token || user.token !== token) {
      
        next(HttpError(401, "User not found"))
    }
    req.user = user;
    next();
    } catch (error) {
         next(HttpError(401))
    }
}