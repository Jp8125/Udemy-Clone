import { createAction, props } from "@ngrx/store";
import { UserModel } from "../Interfaces/user.model";
import { User } from "../Interfaces/user";

export const loadUsers=createAction('[Load] users');
export const loaduserSuccess=createAction('[Load] users success',props<{users:Array<UserModel>}>());
export const loaduserFailure=createAction('[Load] Failed',props<{message:string}>());

export const AddUser=createAction('[Add] User',props<{user:User}>());
export const addUsersuccess=createAction('[Add] User Success',props<{user:UserModel}>());