import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, of, mergeMap, throwError } from "rxjs";
import { loadPurchases, loadPurchasesuccess, puchaseCourse, purchaseSuccess } from "./purchase.actions";
import { CourseService } from "../user/Services/course.service";

@Injectable()
export class PurchaseEffect{
    constructor(private actions$:Actions,private course:CourseService){ }
loadPurchase$ = createEffect(() => {
    return this.actions$.pipe(
            ofType(loadPurchases),
            mergeMap((value) =>
                this.course.getPurchaseitems(value.id).pipe(
                    map(res => loadPurchasesuccess({data:res})))
                ),
    );
});
Purchase$ = createEffect(() => {
    return this.actions$.pipe(
            ofType(puchaseCourse),
            mergeMap((value) =>
                this.course.purchase(value.data,value.uid).pipe(
                    map(res => purchaseSuccess({data:res})))
                ),
    );
});
}