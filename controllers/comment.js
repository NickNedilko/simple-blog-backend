import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";
import { HttpError } from "../utils/httpError.js";



export const createComment = async (req, res) => {
    const { text, post, user } = req.body;
    const foundPost = await PostModel.findById(post);
    if (!foundPost) {
        return res.status(404).json({ message: 'Post not found' });
    }

     const updatedPost = await PostModel.findOneAndUpdate(
        { _id: post },
        { $inc: { commentsCount: 1 } },
        { new: true,  } 
    );

    if (!updatedPost) {
        return res.status(400).json({ message: 'Failed to update comments count' });
    }

    const newComment = await CommentModel.create({ text, user, post });


    res.status(201).json(newComment);
};


export const getAllComments = async (req, res) => {
    const comments = await CommentModel.find().populate('user', '-password -email -token -passwordHash').sort({ createdAt: -1 });
    if (!comments) {
        throw HttpError(404, 'Not found');
    }
    res.json(comments);
}

export const getPostComments = async (req, res) => {
    const postId = req.params.id;
    const comments = await CommentModel.find({ post: postId }).populate('user', '-password -email -token -passwordHash');
    if (!comments) {
        throw HttpError(404, 'Not found');
    }
    res.json(comments);
}

export const removeComment = async (req, res) => {
    const commentId = req.params.id;
        const comment = await CommentModel.findOneAndDelete({ _id: commentId });
        if (!comment) {
        throw HttpError(404, 'Комментарий не найден');
        }
        const postId = comment.post;

        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { commentsCount: -1 } }, 
            { new: true }  
        );

        if (!updatedPost) {
            return res.status(400).json({ message: 'Не удалось обновить счетчик комментариев' });
        }

        // Возвращаем удаленный комментарий в ответе
        res.json({ message: 'Комментарий удален' });
    
};