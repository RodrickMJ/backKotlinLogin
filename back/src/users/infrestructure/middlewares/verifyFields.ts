import { Request, Response, NextFunction } from "express";
import FieldValidatorUtils from "../utils/FieldValidatorUtils";
import UserRequest from "../../domain/DTOS/UserRequest";

export default class FieldValidator {
    
    constructor(private readonly fieldValidator: FieldValidatorUtils) {}

    async run(req: Request, res: Response, next: NextFunction) {
        const { name, email, password, rol }: UserRequest = req.body;
        const data: UserRequest = { name, email, password, rol };

        const result = this.fieldValidator.addValidator(data);
        if (!result.isValid) {
            return res.status(400).json({
                data: null,
                msg: result.message,
            });
        }

        next();
    }



}
