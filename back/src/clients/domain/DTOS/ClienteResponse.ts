export default interface ClienteResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    direccion: string;
    rol: 'Cliente';
    imageUrl?: string;
    loans: {
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
    }[];
}