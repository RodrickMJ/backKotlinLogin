import mongoose, { Schema, Document } from 'mongoose';
import { IClient, Payment, Loan } from './ClientInterface';

type PaymentDocument = Document & Omit<Payment, 'id'> & {
    id: string;
};

type LoanDocument = Document & Omit<Loan, 'id' | 'payments'> & {
    id: string;
    payments: PaymentDocument[];
};

type ClientDocument = Document & Omit<IClient, 'id' | 'loans'> & {
    id: string;
    loans: LoanDocument[];
};

const PaymentSchema = new Schema<PaymentDocument>({
    id: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['Completed', 'Pending'], required: true },
});

const LoanSchema = new Schema<LoanDocument>({
    id: { type: String, required: true },
    clientId: { type: String, required: true },
    amount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    term: { type: Number, required: true },
    dailyPayment: { type: Number, required: true },
    totalToPay: { type: Number, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Paid', 'Overdue'], required: true },
    payments: [PaymentSchema],
});

const ClientSchema = new Schema<ClientDocument>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    direccion: { type: String, required: true },
    rol: { type: String, enum: ['Cliente'], required: true },
    imageUrl: { type: String },
    loans: [LoanSchema],
});

export default mongoose.model<ClientDocument>('Client', ClientSchema);