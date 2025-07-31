import LoanResponse from '../domain/DTOS/LoanResponse';
import LoanRepository from '../domain/LoanRepository';

export default class ListLoansByClientUseCase {
    constructor(readonly loanRepository: LoanRepository) { }

    async run(clientId: string): Promise<LoanResponse[] | null> {
        const result = await this.loanRepository.getLoansByClientId(clientId);

        if (!result) return null;

        const response: LoanResponse[] = result.map((loan) => ({
            id: loan.id,
            clientId: loan.clientId,
            amount: loan.amount,
            interestRate: loan.interestRate,
            term: loan.term,
            dailyPayment: loan.dailyPayment,
            totalToPay: loan.totalToPay,
            startDate: loan.startDate,
            endDate: loan.endDate,
            status: loan.status,
            payments: loan.payments,
            lastPayment: loan.payments.length > 0 ? loan.payments[loan.payments.length - 1].amount : 0,
        }));

        return response;
    }
}