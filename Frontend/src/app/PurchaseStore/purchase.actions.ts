import { createAction, props } from "@ngrx/store";
import { PurchaseStore } from "../Interfaces/purchasestore.model";

export const loadPurchases=createAction('[load] purchase',props<{id:number}>());
export const loadPurchasesuccess=createAction('[load purchase success]',props<{data:PurchaseStore}>())


export const puchaseCourse=createAction('[purchase] Course',props<{data:Array<{ userId:number,courseId:number}>,uid:number}>())
export const purchaseSuccess=createAction('[purchase] Course Success',props<{data:PurchaseStore}>())