import { Router } from 'express';
import {
    addController,
    listController,
    deleteController,
    getClientByIdController,
} from '../Dependencies';

const router = Router();

router.get(
    '/',
    listController.run.bind(listController)
);

router.get(
    '/:id',
    getClientByIdController.run.bind(getClientByIdController)
);

router.delete(
    '/:id',
    deleteController.run.bind(deleteController)
);

router.post(
    '/create',
    addController.run.bind(addController)
);

export default router;