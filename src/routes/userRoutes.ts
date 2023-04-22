import { Router } from 'express';
import { createUser, deleteUser, getAllUser, getUser, loginUser, updateUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUser)
router.post('/', createUser);
router.get('/:username', getUser);
router.put('/edit/:username', updateUser);
router.delete('/:username', deleteUser);
router.post('/login', loginUser);

export default router;