import PaymentRequest from '../domain/DTOS/PaymentRequest';
import LoanResponse from '../domain/DTOS/LoanResponse';
import LoanRepository from '../domain/LoanRepository';

export default class AddPaymentUseCase {
    constructor(readonly loanRepository: LoanRepository) { }

    async run(loanId: string, paymentRequest: PaymentRequest): Promise<LoanResponse | null> {
        const result = await this.loanRepository.addPayment(loanId, paymentRequest);

        if (!result) return null;

        const totalPaid = result.payments.reduce((sum, payment) => sum + payment.amount, 0);
        let status = result.status;
        if (totalPaid >= result.totalToPay) {
            status = 'Paid';
        } else if (new Date() > new Date(result.endDate)) {
            status = 'Overdue';
        }

        const updatedLoan = await this.loanRepository.addPayment(loanId, { ...paymentRequest, status: 'Completed' });
        if (!updatedLoan) return null;

        const response: LoanResponse = {
            id: updatedLoan.id,
            clientId: updatedLoan.clientId,
            amount: updatedLoan.amount,
            interestRate: updatedLoan.interestRate,
            term: updatedLoan.term,
            dailyPayment: updatedLoan.dailyPayment,
            totalToPay: updatedLoan.totalToPay,
            startDate: updatedLoan.startDate,
            endDate: updatedLoan.endDate,
            status,
            payments: updatedLoan.payments,
            lastPayment: updatedLoan.payments.length > 0 ? updatedLoan.payments[updatedLoan.payments.length - 1].amount : 0,
        };

        return response;
    }
}