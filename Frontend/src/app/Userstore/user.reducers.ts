import { createReducer, on } from "@ngrx/store";
import { UserStateModel } from "../Interfaces/user-state.model";
import { addUsersuccess, loaduserFailure, loaduserSuccess } from "./user.action";


const initialState:UserStateModel={
    users:[]
}
export const userReducer = createReducer(
    initialState,
    on(loaduserSuccess,(state,{users})=> ({ ...state, users: [...state.users,...users] })),
    on(addUsersuccess,(state,{user})=>({...state,users:[...state.users,user]}))
    // on(loaduserFailure,(state,{message})=>({...})),
);
