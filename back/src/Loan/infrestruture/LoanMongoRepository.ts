import LoanRequest from '../domain/DTOS/LoanRequest';
import ILoan, { Payment } from '../domain/Loan';
import LoanRepository from '../domain/LoanRepository';
import PaymentRequest from '../domain/DTOS/PaymentRequest';
import ClientModel from '../../config/model/ModelClient';
import { v4 as uuidv4 } from 'uuid';

export default class LoanMongoRepository implements LoanRepository {
    constructor(readonly model: typeof ClientModel) { }

    async addLoan(loanRequest: LoanRequest): Promise<ILoan | null> {
        try {
            const { amount, term, clientId } = loanRequest;

            // Validar que el cliente exista
            const client = await this.model.findOne({ id: clientId });
            if (!client) {
                console.error('Client not found:', clientId);
                return null;
            }

            // Calcular detalles del préstamo
            let interestRate: number;
            if (term === 30) {
                interestRate = 0.30;
            } else if (term === 25 || term === 20) {
                interestRate = 0.20;
            } else {
                throw new Error('Plazo no válido. Solo se permiten 20, 25 o 30 días.');
            }

            const interest = amount * interestRate;
            const totalToPay = amount + interest;
            const dailyPayment = totalToPay / term;

            const startDate = new Date().toISOString();
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + term);

            const loan: ILoan = {
                id: uuidv4(),
                clientId,
                amount,
                interestRate,
                term,
                dailyPayment,
                totalToPay,
                startDate,
                endDate: endDate.toISOString(),
                status: 'Active',
                payments: [],
            };

            // Convertir ILoan a formato compatible con Mongoose
            const loanDocument = loan as any; // Cast temporal para evitar error de tipos
            client.loans.push(loanDocument);
            await client.save();

            return loan;
        } catch (error) {
            console.error('Error trying to add loan to database:', error);
            throw new Error('Error adding loan to database. Please try again.');
        }
    }

    async getLoanByPk(pk: string): Promise<ILoan | null> {
        try {
            const client = await this.model.findOne({ 'loans.id': pk });
            if (!client) return null;

            const loan = client.loans.find((l) => l.id === pk);
            return loan ? { ...loan.toObject(), clientId: client.id } as ILoan : null;
        } catch (error) {
            console.error('Error trying to search for loan in database:', error);
            throw new Error(`Error retrieving loan with id: ${pk}.`);
        }
    }

    async getLoansByClientId(clientId: string): Promise<ILoan[] | null> {
        try {
            const client = await this.model.findOne({ id: clientId });
            if (!client) return null;

            return client.loans.map((loan) => ({ ...loan.toObject(), clientId } as ILoan));
        } catch (error) {
            console.error('Error trying to search for loans in database:', error);
            throw new Error(`Error retrieving loans for client: ${clientId}.`);
        }
    }

    async deleteByPk(pk: string): Promise<boolean> {
        try {
            const client = await this.model.findOne({ 'loans.id': pk });
            if (!client) return false;

            client.loans = client.loans.filter((loan) => loan.id !== pk);
            await client.save();
            return true;
        } catch (error) {
            console.error('Error trying to delete loan from database:', error);
            throw new Error(`Error deleting loan with id: ${pk}.`);
        }
    }

    async addPayment(loanId: string, paymentRequest: PaymentRequest): Promise<ILoan | null> {
        try {
            const client = await this.model.findOne({ 'loans.id': loanId });
            if (!client) return null;

            const loan = client.loans.find((l) => l.id === loanId);
            if (!loan) return null;

            const payment: Payment = {
                id: uuidv4(),
                amount: paymentRequest.amount,
                date: new Date().toISOString(),
                status: paymentRequest.status || 'Completed',
            };

            loan.payments.push(payment as any); // Cast temporal para compatibilidad
            await client.save();

            return { ...loan.toObject(), clientId: client.id } as ILoan;
        } catch (error) {
            console.error('Error trying to add payment to loan:', error);
            throw new Error(`Error adding payment to loan with id: ${loanId}.`);
        }
    }
}