import { Request, Response } from 'express';
import ListLoansByClientUseCase from '../../aplication/ListLoansByClientUseCase';

export default class ListLoansByClientController {
    constructor(readonly listLoansByClientUseCase: ListLoansByClientUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const { clientId } = req.params;

            if (!clientId) {
                return res.status(400).json({
                    data: null,
                    msg: 'Client ID is required.',
                });
            }

            const result = await this.listLoansByClientUseCase.run(clientId);

            if (!result || result.length === 0) {
                return res.status(404).json({
                    data: null,
                    msg: 'No loans found for client',
                });
            }

            return res.status(200).json({
                data: result,
                msg: 'Loans retrieved successfully',
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