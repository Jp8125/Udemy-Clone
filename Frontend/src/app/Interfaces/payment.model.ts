export interface Payment{
    id: string,
    amount: number,
    status:string,
    method: string,
    bank: string|null,
    wallet: string,
    created_at: number
}

export interface PaymentInput{
    purchaseId: string,
    paymentAmount: number,
    paymentStatus: string,
    paymentMode: string,
    uid: number
}