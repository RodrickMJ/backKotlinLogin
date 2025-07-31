export interface Payment {
    id: string;
    amount: number;
    date: string; // ISO string
    status: 'Completed' | 'Pending';
}

export default interface ILoan {
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