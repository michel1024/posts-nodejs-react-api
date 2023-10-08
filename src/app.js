import express from "express";
import postRouter from "./Routes/postRouter.js";
import userRouter from "./Routes/userRouter.js";


const app = express();

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("<h1>Hola Mundo</h1>");
})


export default app;