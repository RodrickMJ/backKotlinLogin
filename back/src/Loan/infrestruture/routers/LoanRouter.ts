import { Router } from 'express';
import {
    addLoanController,
    deleteLoanController,
    getLoanByIdController,
    listLoansByClientController,
    addPaymentController,
} from '../Dependencies';

const router = Router();

router.post(
    '/create',
    addLoanController.run.bind(addLoanController)
);

router.get(
    '/:id',
    getLoanByIdController.run.bind(getLoanByIdController)
);

router.get(
    '/client/:clientId',
    listLoansByClientController.run.bind(listLoansByClientController)
);

router.delete(
    '/:id',
    deleteLoanController.run.bind(deleteLoanController)
);

router.post(
    '/:id/pay',
    addPaymentController.run.bind(addPaymentController)
);

export default router;