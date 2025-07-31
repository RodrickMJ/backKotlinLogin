export default interface LoanResponse {
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
    payments: {
        id: string;
        amount: number;
        date: string;
        status: 'Completed' | 'Pending';
    }[];
    lastPayment: number; // Nuevo campo para "Último pago"
}