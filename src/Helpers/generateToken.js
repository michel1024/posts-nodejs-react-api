import jwt from "jsonwebtoken";

export const getToken = async (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.Email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
}

export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}