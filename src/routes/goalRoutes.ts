import { Router } from 'express';
import { createGoal, deleteGoal, getGoal, getUserGoals, updateGoal } from '../controllers/goalController';


const router = Router();

router.post('/', createGoal);

router.get('/detail/:id', getGoal);

router.put('/detail/:id', updateGoal);

router.delete('/detail/:id', deleteGoal);

router.get('/:username', getUserGoals);

export default router;