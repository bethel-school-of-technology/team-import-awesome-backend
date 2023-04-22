"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoal = exports.updateGoal = exports.getGoal = exports.createGoal = exports.getAllGoals = void 0;
const goal_1 = require("../models/goal");
const auth_1 = require("../services/auth");
const getAllGoals = async (req, res) => {
    let tasks = await goal_1.Goal.findAll();
    res.status(200).json(tasks);
};
exports.getAllGoals = getAllGoals;
const createGoal = async (req, res) => {
    let user = await (0, auth_1.verifyUser)(req); // user authentication
    if (!user) {
        return res.status(403).send();
    }
    let newGoal = req.body;
    newGoal.username = user.username;
    if (newGoal.title && newGoal.plan) { // goal is created if it has a title and plan
        let created = await goal_1.Goal.create(newGoal);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createGoal = createGoal;
const getGoal = async (req, res) => {
    let goalId = req.params.id;
    let goal = await goal_1.Goal.findByPk(goalId);
    if (goal) {
        res.status(200).json(goal);
    }
    else {
        res.status(404).json({});
    }
};
exports.getGoal = getGoal;
const updateGoal = async (req, res) => {
    let user = await (0, auth_1.verifyUser)(req); // user authentication
    if (!user) {
        return res.status(403).send();
    }
    let goalId = req.params.id; // extract the goal ID from the request parameters
    let newGoal = req.body; //updated goal object
    newGoal.username = user.username; // Tthe username param of the newGoal object is set to the username of the authenticated user.
    let goalFound = await goal_1.Goal.findByPk(goalId); // finding goal that is to be edited by its id
    if (goalFound && // if a goal was found
        goalFound.username == newGoal.username && // if the user for the goal found matches up with the user for the goal being edited
        user.username == goalFound.username // if the user logged in matches the goal that was found
        && newGoal.title && newGoal.plan) { //if the updated goal has the title & plan fields filled in
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
const deleteGoal = async (req, res) => {
    let user = await (0, auth_1.verifyUser)(req); // user authentication
    if (!user) {
        return res.status(403).send();
    }
    let goalId = req.params.id;
    let goalFound = await goal_1.Goal.findByPk(goalId);
    if (goalFound && goalFound.username == user.username) { // check if the user logged in matches the username for goal
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
