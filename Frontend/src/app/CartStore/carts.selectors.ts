import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartStore } from "../Interfaces/CartStore.model";

export const SelectCarts=createFeatureSelector<CartStore>('cart')
export const selectallCarts = createSelector(
    SelectCarts,
    (state: CartStore) => state.Carts
);
export const cartNumbers = createSelector(
    SelectCarts,
    (state: CartStore) => state.Carts.length
);