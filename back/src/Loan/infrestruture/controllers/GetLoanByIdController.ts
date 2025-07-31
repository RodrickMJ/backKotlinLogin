import { Request, Response } from 'express';
import GetLoanByIdUseCase from '../../aplication/GetLoanByIdUseCase';

export default class GetLoanByIdController {
    constructor(readonly getLoanByIdUseCase: GetLoanByIdUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    data: null,
                    msg: 'Loan ID is required.',
                });
            }

            const result = await this.getLoanByIdUseCase.run(id);

            if (!result) {
                return res.status(404).json({
                    data: null,
                    msg: 'Loan not found',
                });
            }

            return res.status(200).json({
                data: result,
                msg: 'Loan retrieved successfully',
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