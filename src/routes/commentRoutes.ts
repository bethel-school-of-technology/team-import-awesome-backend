import { Router } from 'express';
import { createComment, deleteComment, getAllComments, getComment, updateComment } from '../controllers/commentController';


const router = Router();

router.get('/', getAllComments);

router.post('/', createComment);

router.get('/:id', getComment);

router.put('/:id', updateComment);

router.delete('/:id', deleteComment);

export default router;