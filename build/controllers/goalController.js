var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { conn } from "../db";
export const getGoal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { goal_id } = req.body;
    yield conn.execute("SELECT title, plan, is_completed, timeframe FROM goals WHERE goal_id=?", [goal_id]);
});
export const createGoal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, plan, is_completed, timeframe } = req.body;
    yield conn.execute("INSERT INTO goals (title, plan, is_compleated, timeframe) VALUES (?, ?, ?, ?)", [title, plan, is_completed, timeframe]);
});
export const updateGoal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let goalId = req.params.goal_id;
    const { title, plan, is_completed, timeframe } = req.body;
    yield conn.execute("UPDATE goals (title, plan, is_compleated, timeframe) VALUES (?, ?, ?, ?)", [title, plan, is_completed, timeframe]);
    res.status(200).json();
});
export const deleteGoal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let goalFound = yield conn.execute("SELECT goal_id FROM goals");
    if (goalFound) {
        yield conn.execute("DELETE FROM goals WHERE goal_id = goalFound");
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
});
