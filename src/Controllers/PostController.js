import Post from "../Models/PostModel.js";

export async function getPosts(req, res){
    try {
        const result = await Post.find();
        res.send(result);
    } catch (error) {
        res.status(404).send({message: "Error getting posts"});
    }
}

export async function newPost(req, res){
    const Title = req.body.title;
    const Body = req.body.body;
    const User = "Erick";
    const date = new Date();
    
    const newPost = new Post({
        Title,
        Body,
        User,
        Date: date,
    })
    
    try {
        const result = await newPost.save();
        res.send(result);
    } catch (error) {
        res.status(404).json({message: "Error saving post"});
    }
}

export async function updatePost(req, res){
    const id = req.params.id;
    const title = req.body.title;
    const body = req.body.body;

    const filter = {_id: id}

    const update = {
        Title: title,
        Body: body,
    }
    
    try {
        let result = await Post.findOneAndUpdate(filter, update);
        res.send(result);
    } catch (error) {
        res.status(404).json({message: "Error to update post"});
    }
}

export async function deletePost(req, res){
    const id = req.params.id;

    const filter = {_id: id}
    
    try {
        let result = await Post.findOneAndDelete(filter);
        res.send(result);
    } catch (error) {
        res.status(404).json({message: "Error removing post"});
    }
}