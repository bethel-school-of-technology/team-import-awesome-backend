"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.signUserToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const secret = 'This is the way';
const hashPassword = async (plainTextPassword) => {
    const saltRound = 12;
    const hash = await bcrypt_1.default.hash(plainTextPassword, saltRound);
    return hash;
};
exports.hashPassword = hashPassword;
const comparePasswords = async (plainTextPassword, hashPassword) => {
    return await bcrypt_1.default.compare(plainTextPassword, hashPassword);
};
exports.comparePasswords = comparePasswords;
const signUserToken = async (user) => {
    let token = jsonwebtoken_1.default.sign({ username: user.username }, secret, { expiresIn: '3hr' });
    return token;
};
exports.signUserToken = signUserToken;
const verifyUser = async (req) => {
    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;
    // If header exists, parse token from `Bearer <token>`
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // Verify the token and get the user
        try {
            let decoded = await jsonwebtoken_1.default.verify(token, secret);
            //change here
            return user_1.User.findByPk(decoded.username);
        }
        catch (err) {
            return null;
        }
    }
    else {
        return null;
    }
};
exports.verifyUser = verifyUser;
