import { RequestHandler } from "express";
import { Goal } from "../models/goal";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllGoals: RequestHandler = async (req, res) => {
    let tasks = await Goal.findAll();
    res.status(200).json(tasks);
}

export const createGoal: RequestHandler = async (req, res) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    let newGoal: Goal = req.body;
    newGoal.username = user.username;

    if (newGoal.title && newGoal.plan) { // goal is created if it has a title and plan
        let created = await Goal.create(newGoal);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const getGoal: RequestHandler = async (req, res) => {
    let goalId = req.params.id;
    let goal = await Goal.findByPk(goalId);
    if (goal) {
        res.status(200).json(goal);
    }
    else {
        res.status(404).json({});
    }
}

export const updateGoal: RequestHandler = async (req, res) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    let goalId = req.params.id; // extract the goal ID from the request parameters

    let newGoal: Goal = req.body; //updated goal object

    newGoal.username = user.username // Tthe username param of the newGoal object is set to the username of the authenticated user.

    let goalFound = await Goal.findByPk(goalId); // finding goal that is to be edited by its id

    if (goalFound && // if a goal was found
        goalFound.username == newGoal.username &&  // if the user for the goal found matches up with the user for the goal being edited
        user.username == goalFound.username // if the user logged in matches the goal that was found
        && newGoal.title && newGoal.plan) { //if the updated goal has the title & plan fields filled in
        await Goal.update(newGoal, {
            where: { goalId: goalId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}

export const deleteGoal: RequestHandler = async (req, res) => {
    let user: User | null = await verifyUser(req); // user authentication

    if (!user) {
        return res.status(403).send();
    }

    let goalId = req.params.id;

    let goalFound = await Goal.findByPk(goalId);

    if (goalFound && goalFound.username == user.username) { // check if the user logged in matches the username for goal
        await Goal.destroy({
            where: { goalId: goalId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}