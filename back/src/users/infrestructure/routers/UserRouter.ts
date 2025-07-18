import { Router } from "express";
import {
    addController,
    listController,
    deleteController,
    autMiddleware,
    fieldValidatorMiddleware
} from "../Dependencies"

const router = Router();

router.get(
    '/',
    autMiddleware.run.bind(autMiddleware),
    listController.run.bind(listController));

router.delete(
    '/:id',
    autMiddleware.run.bind(autMiddleware),
    deleteController.run.bind(deleteController));

router.post(
    '/create/:id',
    fieldValidatorMiddleware.run.bind(fieldValidatorMiddleware),
    autMiddleware.run.bind(autMiddleware),
    addController.run.bind(addController));


export default router;