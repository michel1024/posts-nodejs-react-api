import express from "express";
import cors from "cors";
import {getUsers, newUser, loginUser, updateUser, deleteUser} from "../Controllers/UserController.js";
import {validateUser} from "../Middleware/auth.js";

const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(cors());

userRouter.get("/", getUsers);

userRouter.post("/", validateUser, newUser)

userRouter.post("/login", loginUser)

userRouter.patch("/:id", updateUser)

userRouter.delete("/:id", deleteUser)

export default userRouter;