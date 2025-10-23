import { Injectable } from "@angular/core";
import { AdminService } from "../Admin/Services/admin.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, of, mergeMap } from "rxjs";
import { AddUser, addUsersuccess, loadUsers, loaduserFailure, loaduserSuccess } from "./user.action";

@Injectable()
export class UserEffects{
constructor(private actions$:Actions,private adminserv:AdminService){}
LoadUsers$ = createEffect(() => {
    return this.actions$.pipe(
            ofType(loadUsers),
            mergeMap(() =>
                this.adminserv.GetUsers().pipe(
                    map(data => loaduserSuccess({users:data})),
                    catchError(error => of(loaduserFailure({message:error.error}))))
                ),
    );
});
addUsers$ = createEffect(() => {
    return this.actions$.pipe(
            ofType(AddUser),
            mergeMap((value) =>
                this.adminserv.AddUser(value.user).pipe(
                    map(data => addUsersuccess({user:data})),
                    catchError(error => of(loaduserFailure({message:error.error}))))
                ),
    );
});
}