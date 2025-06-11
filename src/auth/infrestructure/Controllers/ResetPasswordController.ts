import ResetPasswordUseCase from "../../aplication/ResetPasswordUseCase";
import TokenService from "../Helpers/TokenService";
import { Request, Response } from "express";


export default class ResetPasswordController {
    constructor(
        readonly resetPasswordUseCase: ResetPasswordUseCase,
        readonly tokenService: TokenService) { }

    async run(req: Request, res: Response) {

        try {

            const { newPassword } = req.body;
            const token = req.headers['authorization'] as string;

            if (!newPassword){
                return res.status(400).json({
                    data: null,
                    msg: "Is required new password"
                })
            }

            const idUser = this.tokenService.getPayload(token)
            if (!idUser) throw new Error('Failed to load payload');

            this.resetPasswordUseCase.run(idUser, newPassword)

            return res.status(200).send('Reset Password succefully');
            
        } catch (error: unknown) {

            console.error(error);
            if (error instanceof Error) {
                if (error.message === 'TOKEN_PAYLOAD_ERROR') {
                    return res.status(500).json({ msg: 'Failed to process token payload', success: false });
                }
            }

            return res.status(500).json({ msg: 'Internal Server Error', success: false });
        }
        }
    }

