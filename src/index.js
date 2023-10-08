import express from "express";
import "dotenv/config";
import app from "./app.js";
import connection from "./DataBase/Connection.js";

console.log(connection);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
})