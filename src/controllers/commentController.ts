import { RequestHandler } from "express";
import { verifyUser } from "../services/auth";
import { Comment } from "../models/comment";
import { User } from '../models/user';



export const getAllComments: RequestHandler = async (req, res, next) => {
    let comments = await Comment.findAll();
    res.status(200).json(comments);
}

export const createComment: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    let newComment: Comment = req.body;
    newComment.username = user.username;

    if (newComment.comment && newComment.goalId) {
        let created = await Comment.create({ ...newComment, username: user.username, goalId: newComment.goalId });
        await created.save()
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}


export const getComment: RequestHandler = async (req, res, next) => {
    let commentId = req.params.id;
    let commentFound = await Comment.findByPk(commentId);
    if (commentFound) {
        res.status(200).json(commentFound);
    } else {
        res.status(404).json();
    }
}


export const updateComment: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    let commentId = req.params.id;
    let newComment: Comment = req.body;

    newComment.username = user.username
    newComment.goalId = req.body.goalId;

    console.log("req.params.id", req.params.id);
    console.log("req.body", req.body);

    let commentFound = await Comment.findByPk(commentId);

    if (commentFound && commentFound.commentId == newComment.commentId
        && commentFound.goalId == newComment.goalId
        && commentFound.username == user.username) {
        await Comment.update(newComment, {
            where: { commentId: commentId }
        });
        res.status(200).json();
    } else {
        res.status(400).json();
    }
}


export const deleteComment: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    const commentId = req.params.id;
    const commentFound = await Comment.findByPk(commentId);


    if (commentFound) {
        await Comment.destroy({
            where: { commentId: commentId }
        });
        res.status(200).json();
    } else {
        res.status(404).json();
    }
}