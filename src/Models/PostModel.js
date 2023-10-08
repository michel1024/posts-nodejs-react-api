import mongoose from "mongoose";

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const PostSchema = new Schema({
    Title: {type: String},
    Body: {type: String},
    User: {type: String},
    Date: {type: Date, default: Date.now},
})

const Post = mongoose.model("Post", PostSchema);

export default Post;