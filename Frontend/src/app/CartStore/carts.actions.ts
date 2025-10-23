import { createAction, props } from "@ngrx/store";
import { CartInputmodel, Cartmodel } from "../Interfaces/Cart.model";

export const loadcarts = createAction('[allcart] Load',props<{id:number}>());
export const loadCartsuccess = createAction('[load success] Load data', props<{data: Array<Cartmodel>}>());

export const addTocart=createAction('[add] addData',props<{data:CartInputmodel}>())
export const addTocartSuccess=createAction('[add] success',props<{cart:Cartmodel}>())

export const removeFromcart=createAction('[remove] removeCart',props<{id:number}>())
export const removeFromcartSuccess=createAction('[remove] removeCartsuccess',props<{id:number}>())

export const clearCart=createAction('[clear] cart',props<{uid:number}>())
export const cleaCartSuccess=createAction('[clear] cart Success',props<{uid:number}>())