var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
const secret = 'This is the way';
export const hashPassword = (plainTextPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRound = 12;
    const hash = yield bcrypt.hash(plainTextPassword, saltRound);
    return hash;
});
export const comparePasswords = (plainTextPassword, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.compare(plainTextPassword, hashPassword);
});
export const signUserToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let token = jwt.sign({ username: user.username }, secret, { expiresIn: '1hr' });
    return token;
});
export const verifyUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;
    // If header exists, parse token from `Bearer <token>`
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // Verify the token and get the user
        try {
            let decoded = yield jwt.verify(token, secret);
            //change here
            return User.findByPk(decoded.username);
        }
        catch (err) {
            return null;
        }
    }
    else {
        return null;
    }
});
