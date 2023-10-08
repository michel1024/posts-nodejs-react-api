import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import {encrypt, compare} from "../Helpers/handleBcrypt.js";
import {getToken} from "../Helpers/generateToken.js";

export async function getUsers(req, res){
    try {
        const result = await User.find();
        res.send(result);
    } catch (error) {
        res.status(404).json({message: "Error getting users"});
    }
}

export async function newUser(req, res){
    const name = req.body.name;
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    const pssHash = await encrypt(password);

    const newUser = new User({
        Name: name,
        User: user,
        Email: email,
        Password: pssHash
    })
    
    try {
        const result = await newUser.save();
        res.send(result);
    } catch (error) {
        res.status(404).json({message: "Error saving user"});
    }
}

export async function loginUser(req, res){
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ Email: email });

        if (!user) {
            return res.status(404).json({ message: "Email or Password invalid" });
        }

        const passwordMatch = await compare(password, user.Password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Email or Password invalid" });
        }

        const tokenSession = await getToken(user);
        console.log(req.headers);
        res.json({ message: "Login successful", user, tokenSession });
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateUser(req, res){
    const id = req.params.id;
    const name = req.body.name;
    const user = req.body.user;
    const email = req.body.email;

    const filter = {_id: id};
    const update = {
        Name: name,
        User: user,
        Email: email
    }
    
    try {
        const result = await User.findOneAndUpdate(filter, update);
        res.send(result.getChanges());
    } catch (error) {
        res.status(404).json({message: "Error to update user"});
    }
}

export async function deleteUser(req, res){
    const id = req.params.id;
    const filter = {_id: id};
    
    try {
        const result = await User.findOneAndDelete(filter);
        res.send(result);
    } catch (error) {
        res.status(404).json({message: "Error removing user"});
    }
}