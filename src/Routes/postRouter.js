import express from "express";
import cors from "cors";
import { deletePost, getPosts, newPost, updatePost } from "../Controllers/PostController.js";
import {checkAuth} from "../Middleware/auth.js";

const postRouter = express.Router();

postRouter.use(express.json());
postRouter.use(cors());


postRouter.get("/", checkAuth, getPosts)

postRouter.post("/", newPost)

postRouter.patch("/:id", updatePost)

postRouter.delete("/:id", deletePost)

export default postRouter;

