import { createReducer, on } from "@ngrx/store"
import { LoadwithoutsubSuccess } from "./allCategory.action"
import { allCategoryStore } from "../Interfaces/allcategoryStore.model"

export const initialState:allCategoryStore={
    categories:[]
}
export const allCategoryReducer=createReducer(initialState,
    on(LoadwithoutsubSuccess,(state,{data})=>({...state,categories:[...state.categories,...data]}))
    )