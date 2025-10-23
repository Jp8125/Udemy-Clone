import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "../Interfaces/CategoryState.model";
import { state } from "@angular/animations";

export const selectCategories = createFeatureSelector<CategoryState>('category');
export const allCategory = createSelector(
    selectCategories,
    (state) => state.categories
);
export const selectByname=(name:string)=>createSelector(
    selectCategories,
    (state)=>state.categories.find(c=>c.categoryName==name)
)