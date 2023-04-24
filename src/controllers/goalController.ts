import { RequestHandler } from "express";
import { Goal } from "../models/goal";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllGoals: RequestHandler = async (req, res, next) => {
    let tasks = await Goal.findAll();
    res.status(200).json(tasks);
}

export const createGoal: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    let newGoal: Goal = req.body;
    newGoal.username = user.username;

    // checking if goal has a title and plan
    if (newGoal.title && newGoal.plan) {
        let created = await Goal.create(newGoal);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const getGoal: RequestHandler = async (req, res, next) => {
    let goalId = req.params.id;

    let goal = await Goal.findByPk(goalId);

    // checking for a goal
    if (goal) {
        res.status(200).json(goal);
    }
    else {
        res.status(404).json({});
    }
}

export const updateGoal: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    // extract the goal ID from the request parameters
    let goalId = req.params.id;

    //updated goal object
    let newGoal: Goal = req.body;

    // New goal username set to current user
    newGoal.username = user.username

    // finding goal that is to be edited by its id
    let goalFound = await Goal.findByPk(goalId);

    // checking for a goal, goalFound username matches username of updated goal, current user matches username of goalFound, new goal has a title and a plan.
    if (goalFound && goalFound.username == newGoal.username && user.username == goalFound.username && newGoal.title && newGoal.plan) {

        await Goal.update(newGoal, {
            where: { goalId: goalId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}

export const deleteGoal: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    let goalId = req.params.id;

    let goalFound = await Goal.findByPk(goalId);

    // checking if current user matches the username of goal
    if (goalFound && goalFound.username == user.username) {
        await Goal.destroy({
            where: { goalId: goalId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}