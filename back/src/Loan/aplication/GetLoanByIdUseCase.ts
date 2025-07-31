import LoanResponse from '../domain/DTOS/LoanResponse';
import LoanRepository from '../domain/LoanRepository';

export default class GetLoanByIdUseCase {
    constructor(readonly loanRepository: LoanRepository) { }

    async run(pk: string): Promise<LoanResponse | null> {
        const result = await this.loanRepository.getLoanByPk(pk);

        if (!result) return null;

        const response: LoanResponse = {
            id: result.id,
            clientId: result.clientId,
            amount: result.amount,
            interestRate: result.interestRate,
            term: result.term,
            dailyPayment: result.dailyPayment,
            totalToPay: result.totalToPay,
            startDate: result.startDate,
            endDate: result.endDate,
            status: result.status,
            payments: result.payments,
            lastPayment: result.payments.length > 0 ? result.payments[result.payments.length - 1].amount : 0,
        };

        return response;
    }
}