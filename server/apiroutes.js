import { Router } from 'express';
import {
    getTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
} from './controller.js';

const router = Router();

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.put('/:id', updateTaskStatus);  
router.delete('/:id', deleteTask);

export default router;