import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addTocart, addTocartSuccess, cleaCartSuccess, clearCart, loadCartsuccess, loadcarts, removeFromcart, removeFromcartSuccess } from "./carts.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { CourseService } from "../user/Services/course.service";
import { Injectable } from "@angular/core";
@Injectable()
export class CartEffect{
    constructor(private actions$:Actions,private courseservice:CourseService) {}
    LoadCartData$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(loadcarts),
                mergeMap((value) =>
                    this.courseservice.GetCarts(value.id).pipe(
                        map(res => loadCartsuccess({data:res})),
                        catchError(error => {throw(error)}))
            ),
        );
    });
    addCartData$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(addTocart),
                mergeMap((value) =>
                    this.courseservice.AddtoCart(value.data).pipe(
                        map(res => addTocartSuccess({cart:res})),
                        catchError(error => {throw(error)}))
            ),
        );
    });
    removeCartData$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(removeFromcart),
                mergeMap((value) =>
                    this.courseservice.RemovefromCart(value.id).pipe(
                        map(res => removeFromcartSuccess({id:res.cartId})),
                        catchError(error => {throw(error)}))
            ),
        );
    });
    clearCatdata$=createEffect(() => {
        return this.actions$.pipe(
                ofType(clearCart),
                mergeMap((value) =>
                    this.courseservice.clearCart(value.uid).pipe(
                        map(res => cleaCartSuccess({uid:res.id})),
                        catchError(error => {throw(error)}))
            ),
        );
    })
}