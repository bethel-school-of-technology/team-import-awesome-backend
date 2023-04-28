import { RequestHandler } from "express";
import { User } from "../models/user";
import { Goal } from "../models/goal";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";

export const getAllUsers: RequestHandler = async (req, res, next) => {
    let users = await User.findAll();
    res.status(200).json(users);
}

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;

    // checking for all required fields filled out
    if (newUser.username && newUser.password && newUser.firstName && newUser.email) {
        let hashedPassword = await hashPassword(newUser.password);

        newUser.password = hashedPassword;

        let created = await User.create(newUser);

        res.status(200).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required!');
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    let username = req.params.username;

    let user = await User.findByPk(username, { include: Goal });

    // checking for a user
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({});
    }
}

export const updateUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    let username = req.params.username;
    let newUser: User = req.body;
    newUser.username = user.username;

    let userFound = await User.findByPk(username);

    // checking for found user and username found matches current user
    if (userFound && userFound.username == newUser.username) {
        await User.update(newUser, {
            where: { username: username }

        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }

}

export const deleteUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    let username = req.params.username;
    let userFound = await User.findByPk(username);

    // checking if user was found and matches current user
    if (userFound && userFound.username == user.username) {
        await User.destroy({
            where: { username: username }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    // Look up user by their username
    let existingUser: User | null = await User.findOne({
        where: { username: req.body.username }
    });

    // If user exists, check that password matches
    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);

        // If passwords match, create a JWT
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token, user: existingUser });
        }
        else {
            res.status(401).json('Invalid password!');
        }
    }
    else {
        res.status(401).json('Invalid username!');
    }
}