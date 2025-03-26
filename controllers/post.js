import { validationResult } from "express-validator";
import PostModel from "../models/Post.js";
import { HttpError } from "../utils/httpError.js";


export const createPost = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        throw HttpError(400, errors.array()[0].msg);
    }
    const { title, text, tags, imageUrl } = req.body;


    const post = await PostModel.create({ title, text, tags, imageUrl, user: req.user._id });
    res.status(201).json(post);
}

export const getAllPosts = async (req, res) => {
    const posts = await PostModel.find()
    res.json(posts);
}

export const getOnePost = async (req, res) => {
    const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true } // Это вернёт обновлённый документ
        );

    if (!doc) {
            throw HttpError(404, 'Post not found');
        }

        res.json(doc); 
    
};

 export const removePost = async (req, res) => {
    const postId = req.params.id;
    const post = await PostModel.findOneAndDelete({ _id: postId });
     if (!post) {
        throw HttpError(404, 'Not found');
    }
     res.json(post);
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, text, tags, imageUrl } = req.body;
    const post = await PostModel.findOneAndUpdate({ _id: postId }, { title, text, tags, imageUrl }, { new: true });
    if (!post) {
        throw HttpError(404, 'Not found');
    }
    res.json(post);
}

export const uploadImage = async (req, res) => {
    const { id } = req.params;
  
    const post = await PostModel.findById(id);
    console.log(post)
    if (!post) {
        throw HttpError(404, 'Post not found');
    }

    if (!req.file) {
        throw HttpError(400, 'No file uploaded');
    }
    post.imageUrl = req.file.path;
    console.log('sfghjgkhljhkgjfhdgf', post)

    await post.save();


    res.status(200).json({
        msg: 'Upload photo success'
    })
}

// export const uploadImage = async (req, res) => {
// res.json({ url: `/uploads/${req.file.originalname}` })
// }