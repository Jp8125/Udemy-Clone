import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PurchaseStore } from "../Interfaces/purchasestore.model";

export const selectCategories = createFeatureSelector<PurchaseStore>('purchase');
export const allpurchasedCourses = createSelector(
    selectCategories,
    (state) => state.courses
);