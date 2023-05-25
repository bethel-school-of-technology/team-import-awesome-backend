"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getAllUsers = void 0;
const user_1 = require("../models/user");
const goal_1 = require("../models/goal");
const auth_1 = require("../services/auth");
const getAllUsers = async (req, res, next) => {
    let users = await user_1.User.findAll();
    res.status(200).json(users);
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res, next) => {
    let newUser = req.body;
    // checking for all required fields filled out
    if (newUser.username && newUser.password && newUser.firstName && newUser.email) {
        let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
        //sets default avatar if none is provided
        newUser.password = hashedPassword;
        if (newUser.avatar?.length < 1) {
            newUser.avatar = 'https://akns-images.eonline.com/eol_images/Entire_Site/2018024/rs_600x600-180124163953-600-tom-myspace.jpg?fit=around%7C1200:1200&output-quality=90&crop=1200:1200;center,top';
        }
        let created = await user_1.User.create(newUser);
        res.status(200).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required!');
    }
};
exports.createUser = createUser;
const getUser = async (req, res, next) => {
    let username = req.params.username;
    let user = await user_1.User.findByPk(username, { include: goal_1.Goal });
    // checking for a user
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({});
    }
};
exports.getUser = getUser;
const updateUser = async (req, res, next) => {
    // user authentication
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let username = req.params.username;
    let newUser = req.body;
    newUser.username = user.username;
    let userFound = await user_1.User.findByPk(username);
    // checking for found user and username found matches current user
    if (userFound && userFound.username == newUser.username) {
        await user_1.User.update(newUser, {
            where: { username: username }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    // user authentication
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let username = req.params.username;
    let userFound = await user_1.User.findByPk(username);
    // checking if user was found and matches current user
    if (userFound && userFound.username == user.username) {
        await user_1.User.destroy({
            where: { username: username }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteUser = deleteUser;
const loginUser = async (req, res, next) => {
    // Look up user by their username
    let existingUser = await user_1.User.findOne({
        where: { username: req.body.username }
    });
    // If user exists, check that password matches
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        // If passwords match, create a JWT
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token, user: existingUser });
        }
        else {
            res.status(401).json('Invalid password!');
        }
    }
    else {
        res.status(401).json('Invalid username!');
    }
};
exports.loginUser = loginUser;
