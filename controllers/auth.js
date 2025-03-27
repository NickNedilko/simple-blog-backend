import UserModel from '../models/User.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/jwt.js';
import { HttpError } from '../utils/httpError.js';

export const register = async (req, res) => {
  
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const newUser = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash
    })

    const user = await newUser.save();

    const token = createToken({
        _id: user._id
    });
     
    await User.findByIdAndUpdate(user._id, {token});

    const { passwordHash: password, ...userData } = user._doc;

    res.json({
        ...userData,
        token
    });
};

export const login = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
       throw HttpError(401, "Email or password is invalid")
    };

    const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isValidPassword) { 
       throw HttpError(401, "Email or password is invalid")
    };
    const token = createToken({
        _id: user._id
    });

    await UserModel.findByIdAndUpdate(user._id, {token});
    const { passwordHash: password, ...userData } = user._doc;

    res.json({
        ...userData,
        token
    });
}

export const getMe = async (req, res) => {
    const {fullName, email, avatarUrl, _id} = req.user;
    

    res.json({
        fullName,
        email,
        avatarUrl,
        _id
    })
}

export const logout = async (req, res) => {
    const { _id } = req.user;
  
    const user = await UserModel.findByIdAndUpdate(_id, { token: '' }, { new: true });
    if (!user) {
         throw HttpError(404, 'User not found')
    }
    res.json({
        message: 'Logout succes'
    })
}

