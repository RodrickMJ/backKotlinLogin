export interface Payment {
    id: string;
    amount: number;
    date: string; // ISO string
    status: 'Completed' | 'Pending';
}

export interface Loan {
    id: string;
    clientId: string;
    amount: number;
    interestRate: number;
    term: number;
    dailyPayment: number;
    totalToPay: number;
    startDate: string;
    endDate: string;
    status: 'Active' | 'Paid' | 'Overdue';
    payments: Payment[];
}

export default interface IClient {
    id: string;
    name: string;
    email: string;
    phone: string;
    direccion: string;
    rol: 'Cliente';
    imageUrl?: string;
    loans: Loan[];
}