import mongoose from "mongoose";

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const UserSchema = new Schema({
    Name: {type: String},
    User: {type: String},
    Email: {type: String},
    Password: {type: String},
})

const User = mongoose.model("User", UserSchema);

export default User;