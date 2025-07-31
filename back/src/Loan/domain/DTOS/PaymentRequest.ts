export default interface PaymentRequest {
    amount: number;
    status?: 'Completed' | 'Pending'; 
}