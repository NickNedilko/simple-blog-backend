import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
    },
     viewsCount: {
        type: Number,
        default: 0
    },
     commentsCount: {
        type: Number,
        default: 0
     },
    imageUrl: {
        type: String,
        default: ''
    },
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});


export default mongoose.model("Post", postSchema);