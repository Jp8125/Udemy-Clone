export interface PurchaseStore{
    pid: number,
    date: string,
    courses:Array<{courseId: number,createdDate:string}>
}

