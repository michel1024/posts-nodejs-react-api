import { verifyToken } from "../Helpers/generateToken.js";
import User from "../Models/UserModel.js";

export const checkAuth = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization;
        console.log({ token });
        const tokenData = await verifyToken(token);
        console.log({ tokenData });
        if (tokenData) {
            next()
        } else {
            res.status(404).json({ message: "No tiene acceso" })
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "No tiene acceso", error })
    }
}

export const validateUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const username = req.body.user;

        const filterUser = await User.findOne({ User: username })
        const filterEmail = await User.findOne({ Email: email })


        if (filterEmail != null && filterUser != null) {
            res.json({ message: "El correo y el usuario se encuentran en uso" })
        }else{

            if (filterEmail != null) {
                res.json({ message: `El correo '${email}' se encuentra en uso` })
            }

            if (filterUser != null) {
                res.json({ message: `El nombre de usuario '${username}' se encuentra en uso` })
            }
        }

        if (filterEmail == null && filterUser == null) {
            next();
        }

    } catch (error) {
        console.error(error);
        res.json({message: "Usuario o Email se encuentra en uso"});
    }
}