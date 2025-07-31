import { Request, Response } from 'express';
import DeleteLoanUseCase from '../../aplication/DeleteLoanUseCase';

export default class DeleteLoanController {
    constructor(readonly deleteLoanUseCase: DeleteLoanUseCase) { }

    async run(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                data: null,
                msg: 'Loan ID is required for deletion.',
            });
        }

        try {
            const result = await this.deleteLoanUseCase.run(id);
            if (!result) {
                return res.status(410).json({
                    data: null,
                    msg: 'Loan has been permanently removed or not found.',
                });
            }

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error',
            });
        }
    }
}