import { Request, Response } from 'express';
import AddPaymentUseCase from '../../aplication/AddPaymentUseCase';
import PaymentRequest from '../../domain/DTOS/PaymentRequest';

export default class AddPaymentController {
    constructor(private readonly addPaymentUseCase: AddPaymentUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { amount }: PaymentRequest = req.body;

            if (!id || !amount) {
                return res.status(400).json({
                    data: null,
                    msg: 'Loan ID and payment amount are required.',
                });
            }

            const result = await this.addPaymentUseCase.run(id, { amount });

            if (!result) {
                return res.status(404).json({
                    data: null,
                    msg: 'Loan not found or payment failed',
                });
            }

            return res.status(201).json({
                data: result,
                msg: 'Payment added successfully',
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