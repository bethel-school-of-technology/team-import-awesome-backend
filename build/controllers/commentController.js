"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getComment = exports.createComment = exports.getAllComments = void 0;
const auth_1 = require("../services/auth");
const comment_1 = require("../models/comment");
const getAllComments = async (req, res, next) => {
    let comments = await comment_1.Comment.findAll();
    res.status(200).json(comments);
};
exports.getAllComments = getAllComments;
const createComment = async (req, res, next) => {
    // user authentication
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newComment = req.body;
    newComment.username = user.username;
    // checking for a comment and a goal 
    if (newComment.comment && newComment.goalId) {
        // creating newComment and setting goalId to newComment.goalId
        let created = await comment_1.Comment.create({ ...newComment, goalId: newComment.goalId });
        await created.save();
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createComment = createComment;
const getComment = async (req, res, next) => {
    let commentId = req.params.id;
    let commentFound = await comment_1.Comment.findByPk(commentId);
    //checking for comment
    if (commentFound) {
        res.status(200).json(commentFound);
    }
    else {
        res.status(404).json();
    }
};
exports.getComment = getComment;
const updateComment = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req); // user authentication
    if (!user) {
        return res.status(403).send();
    }
    let commentId = req.params.id;
    let newComment = req.body;
    // setting comment username to current user
    newComment.username = user.username;
    newComment.goalId = req.body.goalId;
    let commentFound = await comment_1.Comment.findByPk(commentId);
    // checking for a comment, the comment found matches comment being updated, goal id of comment matches new comment goal id, and username from old comment matches username of current user.
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
exports.updateComment = updateComment;
const deleteComment = async (req, res, next) => {
    // user authentication
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    const commentId = req.params.id;
    const commentFound = await comment_1.Comment.findByPk(commentId);
    // checking for comment and if comment's username matches current user.
    if (commentFound && commentFound.username == user.username) {
        await comment_1.Comment.destroy({
            where: { commentId: commentId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteComment = deleteComment;
