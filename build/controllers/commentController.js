"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.getAllComments = void 0;
const auth_1 = require("../services/auth");
const comment_1 = require("../models/comment");
const getAllComments = async (req, res, next) => {
    let comments = await comment_1.Comment.findAll();
    res.status(200).json(comments);
};
exports.getAllComments = getAllComments;
const createComment = async (req, res, next) => {
    let newComment = req.body;
    let user = await (0, auth_1.verifyUser)(req);
    console.log(user);
    if (newComment.comment && user && newComment.goalId) {
        let created = await comment_1.Comment.create({ ...newComment, username: user.username, goalId: newComment.goalId });
        await created.save();
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
    export const getComment = async (req, res, next) => {
        let commentId = req.params.id;
        let commentFound = await comment_1.Comment.findByPk(commentId);
        if (commentFound) {
            res.status(200).json(commentFound);
        }
        else {
            res.status(404).json();
        }
    };
    export const updateComment = async (req, res, next) => {
        let commentId = req.params.id;
        let newComment = req.body;
        let commentFound = await comment_1.Comment.findByPk(commentId);
        const user = await (0, auth_1.verifyUser)(req);
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        if (commentFound && commentFound.commentId == newComment.commentId
            && commentFound.goalId == newComment.goalId
            && commentFound.username == user.username) {
            await comment_1.Comment.update(newComment, {
                where: { commentId: commentId }
            });
            res.status(200).json();
        }
        else {
            res.status(400).json();
        }
    };
    export const deleteComment = async (req, res, next) => {
        const commentId = req.params.id;
        const commentFound = await comment_1.Comment.findByPk(commentId);
        const user = await (0, auth_1.verifyUser)(req);
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        if (commentFound) {
            await comment_1.Comment.destroy({
                where: { commentId: commentId }
            });
            res.status(200).json();
        }
        else {
            res.status(404).json();
        }
    };
};
exports.createComment = createComment;
