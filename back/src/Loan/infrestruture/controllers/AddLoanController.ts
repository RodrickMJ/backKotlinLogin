import { Request, Response } from 'express';
import AddLoanUseCase from '../../aplication/AddLoanUseCase';
import LoanRequest from '../../domain/DTOS/LoanRequest';

export default class AddLoanController {
    constructor(private readonly addLoanUseCase: AddLoanUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const { clientId, amount, term }: LoanRequest = req.body;

            if (!clientId || !amount || !term) {
                return res.status(400).json({
                    data: null,
                    msg: 'Client ID, amount, and term are required.',
                });
            }

            const result = await this.addLoanUseCase.run({
                clientId,
                amount,
                term,
            });

            if (!result) {
                return res.status(409).json({
                    data: null,
                    msg: 'Client not found or loan creation failed',
                });
            }

            return res.status(201).json({
                data: result,
                msg: 'Loan created successfully',
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