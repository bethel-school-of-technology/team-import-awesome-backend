import { Router } from 'express';
import { createGoal, deleteGoal, getGoal, getUserGoals, updateGoal } from '../controllers/goalController';


const router = Router();

router.get('/', getUserGoals);

router.post('/', createGoal);

router.get('/:id', getGoal);

router.put('/:id', updateGoal);

router.delete('/:id', deleteGoal);

export default router;