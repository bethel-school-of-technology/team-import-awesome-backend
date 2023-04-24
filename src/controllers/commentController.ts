import { RequestHandler } from "express";
import { verifyUser } from "../services/auth";
import { Comment } from "../models/comment";
import { User } from '../models/user';



export const getAllComments: RequestHandler = async (req, res, next) => {
    let comments = await Comment.findAll();
    res.status(200).json(comments);
}


// Aaron: we might need to somehow bring in the goalId without making the user enter it.

export const createComment: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    let newComment: Comment = req.body;
    newComment.username = user.username;

    // checking for a comment and a goal 
    if (newComment.comment && newComment.goalId) {

        // creating newComment and setting goalId to newComment.goalId
        let created = await Comment.create({ ...newComment, goalId: newComment.goalId });
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

    //checking for comment
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

    // setting comment username to current user
    newComment.username = user.username
    newComment.goalId = req.body.goalId;

    let commentFound = await Comment.findByPk(commentId);

    // checking for a comment, the comment found matches comment being updated, goal id of comment matches new comment goal id, and username from old comment matches username of current user.
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

    // checking for comment and if comment's username matches current user.
    if (commentFound && commentFound.username == user.username) {
        await Comment.destroy({
            where: { commentId: commentId }
        });
        res.status(200).json();
    } else {
        res.status(404).json();
    }
}