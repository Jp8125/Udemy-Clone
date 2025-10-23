import { createReducer, on } from "@ngrx/store";
import { PurchaseStore } from "../Interfaces/purchasestore.model";
import { loadPurchasesuccess, purchaseSuccess } from "./purchase.actions";

const initialState:PurchaseStore={
    pid:0,
    date:"",
    courses:[]
}

export const purchaseReducer=createReducer(
    initialState,
    on(loadPurchasesuccess,(state,{data})=>({...state,pid:data.pid,date:data.date,courses:data.courses})),
    on(purchaseSuccess,(state,{data})=>({...state,pid:data.pid,date:data.date,courses:[...state.courses,...data.courses]}))
)