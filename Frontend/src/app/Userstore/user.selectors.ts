import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PurchaseStore } from "../Interfaces/purchasestore.model";
import { UserStateModel } from "../Interfaces/user-state.model";

export const selectUsers = createFeatureSelector<UserStateModel>('users');
export const allUsers = createSelector(
    selectUsers,
    (state) => state.users
);
export const UserCount = createSelector(
    selectUsers,
    (state) => state.users.length
);