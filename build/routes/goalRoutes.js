import { Router } from 'express';
import { createGoal, deleteGoal, getAllGoals, getGoal, updateGoal } from '../controllers/goalController';
const router = Router();
router.get('/', getAllGoals);
router.post('/', createGoal);
router.get('/:id', getGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);
export default router;
