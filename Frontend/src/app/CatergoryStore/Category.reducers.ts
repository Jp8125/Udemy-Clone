import { createReducer, on } from "@ngrx/store";
import { CategoryState } from "../Interfaces/CategoryState.model";
import { LoadCategorySuccess } from "./Category.actions";

export const initialState:CategoryState={
    categories:[]
}
export const cateGoryReducer=createReducer(initialState,
    on(LoadCategorySuccess,(state,{data})=>({...state,categories:[...state.categories,...data]}))
    )