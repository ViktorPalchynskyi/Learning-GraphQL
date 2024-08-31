import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const hashPassword = async (
    password: string
): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const generateToken = (user: IUser): string => {
    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
};
