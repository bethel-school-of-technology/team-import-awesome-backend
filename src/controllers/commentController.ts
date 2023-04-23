import {RequestHandler} from "express";
import {verifyUser} from "../services/auth.js";
import { Comment } from "../models/comment";
import { User } from '../models/user';



export const getAllComments: RequestHandler = async (req, res, next) => {
    let comments = await Comment.findAll();
    res.status(200).json(comments);
}

export const createComment: RequestHandler = async (req, res, next) => {
    let newComment: Comment = req.body;
    let user = await verifyUser(req);
    console.log(user);
    if (newComment.comment && user && newComment.goalId)  {
        let created = await Comment.create({...newComment, username: user.username, goalId: newComment.goalId});
        await created.save()
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
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
    let commentId = req.params.id;
    let newComment: Comment = req.body;

    let commentFound = await Comment.findByPk(commentId);

    const user = await verifyUser(req);
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

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
    const commentId = req.params.id;
    const commentFound = await Comment.findByPk(commentId);

    const user = await verifyUser(req);
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (commentFound) {
        await Comment.destroy({
            where: {commentId: commentId}
        });
        res.status(200).json();
    } else {
        res.status(404).json();
    }
}