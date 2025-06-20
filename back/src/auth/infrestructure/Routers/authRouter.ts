import { Router } from "express";
import {
    accessController,
    findUserForPasswordResetController,
    addController,
    verifyCodeController,
    authMiddleware,
    resetPasswordController,
    findUserByPkController,
    updateByPkController,
    deleteController
} from "../Dependencies";


const router = Router();

router.post(
    '/access',
    accessController.run.bind(accessController));

router.post(
    '/create',
    addController.run.bind(addController));

router.get('/:id',
    authMiddleware.run.bind(authMiddleware),
    findUserByPkController.run.bind(findUserByPkController));

router.patch('/:id',
    authMiddleware.run.bind(authMiddleware),
    updateByPkController.run.bind(updateByPkController));

router.delete(
    '/:id',
    authMiddleware.run.bind(authMiddleware),
    deleteController.run.bind(deleteController));


//reset-password
router.post(
    '/send-verification-code',
    findUserForPasswordResetController.run.bind(findUserForPasswordResetController));

router.post(
    '/recive/:code',
    authMiddleware.run.bind(authMiddleware),
    verifyCodeController.run.bind(verifyCodeController));

router.post(
    '/reset-password',
    authMiddleware.run.bind(authMiddleware),
    resetPasswordController.run.bind(resetPasswordController))

export default router;