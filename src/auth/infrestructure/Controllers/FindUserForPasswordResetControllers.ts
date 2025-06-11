import { Request, Response } from "express";
import FindUserForPasswordResetUseCase from "../../aplication/FindUserForPasswordResetUseCase";

export default class FindUserForPasswordResetController {
    constructor(
        readonly findUserForPassswordReset: FindUserForPasswordResetUseCase
    ) { }

    async run(req: Request, res: Response) {
        const { name, email } = req.body;

        if (!email || !name) {
            return res.status(400).json({
                data: null,
                msg: "Is required fields"
            })
        }

        try {
            const result = await this.findUserForPassswordReset.run(name, email);
            if (!result) {
                return res.status(404).json({
                    data: null,
                    msg: 'User not Found'
                });
            }


            return res.status(200).json({
                data: result.token,
                msg: result.msg
            });

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error'
            })
        }


    }

}