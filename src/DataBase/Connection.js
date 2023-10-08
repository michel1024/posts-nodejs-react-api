import mongoose from "mongoose";

const host = process.env.DB_HOST;
const db_name = process.env.DB_NAME;

let message = "";

try {
    await mongoose.connect(`mongodb://${host}/${db_name}`);
    message = "Database is connected!";
} catch (error) {
    message = "Error connecting database";
}

export default message;