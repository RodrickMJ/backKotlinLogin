// auth/infrestructure/AddController.ts
import { Request, Response } from "express";
import AddUseCase from "../../aplication/AddUseCase";
import AuthRequest from "../../domain/DTOS/AuthRequest";

export default class AddController {
    constructor(readonly addUseCase: AddUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const { email, name, password }: AuthRequest = req.body;
            const result = await this.addUseCase.run({ email, name, password });

            if (!result) {
                return res.status(409).json({
                    data: null,
                    msg: "User already exists"
                });
            }

            return res.status(201).json({
                data: result,
                msg: 'User created successfully'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error'
            });
        }
    }
}
