import { createReducer, on, State, Action } from "@ngrx/store";
import { ProgressState } from "../Interfaces/progress-state";
import { UpdateSuccess, loadProgressFail, loadProgressSuccess } from "./progress.action";
const initialState:ProgressState={
    progress:[],
    error:""
}

export const ProgressReducer = createReducer(
    initialState,
    on(loadProgressSuccess, (state,{progress}) => ({ ...state, progress:[...progress] })),
    on(loadProgressFail,(state,{error})=>({...state,error:error})),
    on(UpdateSuccess,(state,{progressData})=>({...state,progress:[...state.progress,progressData]}))
);
