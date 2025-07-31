import ILoan from './Loan';
import LoanRequest from './DTOS/LoanRequest';
import PaymentRequest from './DTOS/PaymentRequest';

export default interface LoanRepository {
    addLoan(loanRequest: LoanRequest): Promise<ILoan | null>;
    getLoanByPk(pk: string): Promise<ILoan | null>;
    getLoansByClientId(clientId: string): Promise<ILoan[] | null>;
    deleteByPk(pk: string): Promise<boolean>;
    addPayment(loanId: string, paymentRequest: PaymentRequest): Promise<ILoan | null>;
}