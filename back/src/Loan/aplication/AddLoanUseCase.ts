import LoanRequest from '../domain/DTOS/LoanRequest';
import LoanResponse from '../domain/DTOS/LoanResponse';
import LoanRepository from '../domain/LoanRepository';
import ILoan from '../domain/Loan';
import { v4 as uuidv4 } from 'uuid';

export default class AddLoanUseCase {
    constructor(readonly loanRepository: LoanRepository) {}

    private calculateLoanDetails(amount: number, term: number): { totalToPay: number; dailyPayment: number; interestRate: number } {
        let interestRate: number;

        if (term === 30) {
            interestRate = 0.30; // 30% para 30 días
        } else if (term === 25 || term === 20) {
            interestRate = 0.20; // 20% para 25 o 20 días
        } else {
            throw new Error('Plazo no válido. Solo se permiten 20, 25 o 30 días.');
        }

        const interest = amount * interestRate;
        const totalToPay = amount + interest;
        const dailyPayment = totalToPay / term;

        return { totalToPay, dailyPayment, interestRate };
    }

    async run(loanRequest: LoanRequest): Promise<LoanResponse | null> {
        const { totalToPay, dailyPayment, interestRate } = this.calculateLoanDetails(loanRequest.amount, loanRequest.term);

        const startDate = new Date().toISOString();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + loanRequest.term);

        const loan: ILoan = {
            id: uuidv4(),
            clientId: loanRequest.clientId,
            amount: loanRequest.amount,
            interestRate,
            term: loanRequest.term,
            dailyPayment,
            totalToPay,
            startDate,
            endDate: endDate.toISOString(),
            status: 'Active',
            payments: [],
        };

        // 🔧 Este era el error: pasabas loanRequest en vez del objeto completo con cálculos
        const result = await this.loanRepository.addLoan(loan);

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
