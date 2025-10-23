export interface EarningModel {
        purchaseId: number,
        userdata: {
          name:string,
          email:string
        }, 
        courses:Array<{ courseId: number,name: string, price: number, thumbnailSrc:string,purchaseDate:string}>
 
}
