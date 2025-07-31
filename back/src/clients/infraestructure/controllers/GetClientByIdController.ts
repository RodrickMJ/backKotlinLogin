import { Request, Response } from 'express';
import GetClientByIdUseCase from '../../aplication/GetClientByIdUseCase';

export default class GetClientByIdController {
    constructor(readonly getClientByIdUseCase: GetClientByIdUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    data: null,
                    msg: 'Client ID is required.',
                });
            }

            const result = await this.getClientByIdUseCase.run(id);

            if (!result) {
                return res.status(404).json({
                    data: null,
                    msg: 'Client not found',
                });
            }

            return res.status(200).json({
                data: result,
                msg: 'Client retrieved successfully',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error',
            });
        }
    }
}