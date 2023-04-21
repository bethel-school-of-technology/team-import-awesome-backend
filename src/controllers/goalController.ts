import { RequestHandler } from "express";
import { conn } from "../db";


export const getGoal: RequestHandler = async (req, res, next) => {
    const { goal_id } = req.body;
    await conn.execute("SELECT title, plan, is_completed, timeframe FROM goals WHERE goal_id=?", [goal_id]);
}

export const createGoal: RequestHandler = async (req, res, next) => {
    const { title, plan, is_completed, timeframe } = req.body;
    await conn.execute("INSERT INTO goals (title, plan, is_compleated, timeframe) VALUES (?, ?, ?, ?)", [title, plan, is_completed, timeframe]);
}

export const updateGoal: RequestHandler = async (req, res, next) => {
    let goalId = req.params.goal_id;
    const { title, plan, is_completed, timeframe } = req.body;

        await conn.execute("UPDATE goals (title, plan, is_compleated, timeframe) VALUES (?, ?, ?, ?)", [title, plan, is_completed, timeframe]);
        
        res.status(200).json();
}

export const deleteGoal: RequestHandler = async (req, res, next) => {
        let goalFound =  await conn.execute("SELECT goal_id FROM goals");
        
        if (goalFound) {
            await conn.execute("DELETE FROM goals WHERE goal_id = goalFound")
            
            res.status(200).json();
        } else {
            res.status(404).json();
        }
    }