import bcrypt from "bcryptjs";

export const encrypt = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

export const compare = async (plainPassword, hashPassword) => {
    const result = await bcrypt.compare(plainPassword, hashPassword);
    return result;
}