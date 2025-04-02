import { validationResult } from "express-validator";
import PostModel from "../models/Post.js";
import { HttpError } from "../utils/httpError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";


export const createPost = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw HttpError(400, errors.array()[0].msg);
    }
    const { title, text, tags, imageUrl } = req.body;


    const post = await PostModel.create({ title, text, tags, imageUrl, user: req.user._id });
    res.status(201).json(post);
}

export const getLastTags = async (req, res) => {
    const posts = await PostModel.find().sort({ createdAt: -1 }).limit(5);
    const tags = posts.map(post => post.tags).flat().slice(0, 5);
    res.json(tags);
}

 export const getAllPosts = async (req, res) => {
    const posts = await PostModel.find().limit(5).populate('user', '-password -email -token -passwordHash').sort({ createdAt: -1 });
    const postsByViewrs = await PostModel.find().limit(5).populate('user', '-password -email -token -passwordHash').sort({ viewsCount: -1 });
   res.json({
       posts,
       postsByViewrs
   });
}

export const getOnePost = async (req, res) => {
    const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true } // Это вернёт обновлённый документ
        ).populate('user', '-_id -password -email -token -passwordHash');

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

// export const uploadImage = async (req, res) => {
//     const { id } = req.params;
  
//     const post = await PostModel.findById(id);
//     if (!post) {
//         throw HttpError(404, 'Post not found');
//     }

//     if (!req.file) {
//         throw HttpError(400, 'No file uploaded');
//     }
//     post.imageUrl = req.file.path;
//     await post.save();


//     res.status(200).json({
//         msg: 'Upload photo success'
//     })
// }


export const uploadPostImage = async (req, res) =>{
  if (!req.file) {
    return res.status(400).json({ message: 'Нет файла для загрузки' });
  }


  try {
    const response = await uploadToCloudinary(req.file.buffer);
    res.json({
      message: 'Файл загружен успешно!',
      imageUrl: response.secure_url
    });
  } catch (error) {
    console.error('Ошибка загрузки в Cloudinary:', error);
    res.status(500).json({ message: 'Ошибка загрузки файла в Cloudinary' });
  }
}; 

