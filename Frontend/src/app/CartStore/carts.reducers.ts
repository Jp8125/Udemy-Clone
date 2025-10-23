import { createReducer, on } from "@ngrx/store";
import { CartStore } from "../Interfaces/CartStore.model";
import { addTocartSuccess, cleaCartSuccess, loadCartsuccess, removeFromcartSuccess } from "./carts.actions";


const initialState:CartStore={
    Carts:[]
}
export const Cartreducer = createReducer(
    initialState,
    on(loadCartsuccess, (state,{data}) => ({ ...state, Carts:[...data] })),
    on(addTocartSuccess,(state,{cart})=> ({ ...state, Carts:[...state.Carts,cart]})),
    on(removeFromcartSuccess,(state,{id})=>({...state,Carts:state.Carts.filter(cart=>cart.cartId!=id)})),
    on(cleaCartSuccess,(state,{uid})=>({...state,Carts:state.Carts.filter(cart=>cart.userId!=uid)}))
);

