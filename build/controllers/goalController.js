"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoal = exports.updateGoal = exports.getGoal = exports.createGoal = exports.getUserGoals = exports.getAllGoals = void 0;
const comment_1 = require("../models/comment");
const goal_1 = require("../models/goal");
const auth_1 = require("../services/auth");
const getAllGoals = async (req, res, next) => {
    let goals = await goal_1.Goal.findAll();
    res.status(200).json(goals);
};
exports.getAllGoals = getAllGoals;
const getUserGoals = async (req, res, next) => {
    let username = req.params.username;
    let goals = await goal_1.Goal.findAll({
        where: {
            username: username
        }
    });
    if (goals) {
        res.status(200).json(goals);
    }
    else {
        res.status(404).json({});
    }
};
exports.getUserGoals = getUserGoals;
const createGoal = async (req, res, next) => {
    // user authentication
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newGoal = req.body;
    newGoal.username = user.username;
    // checking if goal has a title and plan
    if (newGoal.title && newGoal.plan && newGoal.startDate && newGoal.endDate) {
        let created = await goal_1.Goal.create(newGoal);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createGoal = createGoal;
const getGoal = async (req, res, next) => {
    let goalId = req.params.id;
    let goal = await goal_1.Goal.findByPk(goalId, { include: [comment_1.Comment] });
    // checking for a goal
    if (goal) {
        res.status(200).json(goal);
    }
    else {
        res.status(404).json({});
    }
};
exports.getGoal = getGoal;
const updateGoal = async (req, res, next) => {
    // user authentication
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    // extract the goal ID from the request parameters
    let goalId = req.params.id;
    //updated goal object
    let newGoal = req.body;
    // New goal username set to current user
    newGoal.username = user.username;
    // finding goal that is to be edited by its id
    let goalFound = await goal_1.Goal.findByPk(goalId);
    // checking for a goal, goalFound username matches username of updated goal, current user matches username of goalFound, new goal has a title and a plan.
    if (goalFound && goalFound.username == newGoal.username && user.username == goalFound.username && newGoal.title && newGoal.plan) {
        await goal_1.Goal.update(newGoal, {
            where: { goalId: goalId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateGoal = updateGoal;
const deleteGoal = async (req, res, next) => {
    // user authentication
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let goalId = req.params.id;
    let goalFound = await goal_1.Goal.findByPk(goalId);
    // checking if current user matches the username of goal
    if (goalFound && goalFound.username == user.username) {
        await goal_1.Goal.destroy({
            where: { goalId: goalId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteGoal = deleteGoal;
