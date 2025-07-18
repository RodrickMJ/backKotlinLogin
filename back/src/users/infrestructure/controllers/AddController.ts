import { Request, Response } from "express";
import AddUseCase from "../../aplication/AddUseCase";
import UserRequest from "../../domain/DTOS/UserRequest";

export default class AddController {
    constructor(private readonly addUseCase: AddUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { name, email, password, rol }: UserRequest = req.body;

            const result = await this.addUseCase.run({
                name,
                email,
                password,
                rol
            });

        if (!result){
            return res.status(409).json({
                data: null,
                msg: "User already exists"
            })
        }

        return res.status(201).json({
            data: result,
            msg: "User created successfully"
        });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error'
            });
        }
        
    }
}
