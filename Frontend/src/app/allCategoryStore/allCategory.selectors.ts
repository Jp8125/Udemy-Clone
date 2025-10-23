import { createFeatureSelector, createSelector } from "@ngrx/store";

import { allCategoryStore } from "../Interfaces/allcategoryStore.model";

export const Categories = createFeatureSelector<allCategoryStore>('categories');
export const allCategories = createSelector(
    Categories,
    (state) => state.categories
);
export const selectByname=(name:string)=>createSelector(
    Categories,
    (state)=>state.categories.find(c=>c.categoryName==name)
)