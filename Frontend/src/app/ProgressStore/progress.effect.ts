import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, of, mergeMap } from "rxjs";
import { CourseService } from "../user/Services/course.service";
import { Action } from "@ngrx/store";
import { UpdateProgress, UpdateSuccess, loadProgress, loadProgressFail, loadProgressSuccess } from "./progress.action";

@Injectable()
export class ProgressEffect{
constructor(private courseService:CourseService,private actions$:Actions){}
LoadProgress$ = createEffect(() => {
    return this.actions$.pipe(
            ofType(loadProgress),
            mergeMap((val) =>
                this.courseService.getProgressDetails(val.uid,val.cid).pipe(
                    map(data => loadProgressSuccess({ progress:data })),
                    catchError(error => of(loadProgressFail(error))))
                ),
    );
});
updateProgress$ = createEffect(() => {
    return this.actions$.pipe(
            ofType(UpdateProgress),
            mergeMap((val) =>
                this.courseService.updateProgress(val.data).pipe(
                    map(data => UpdateSuccess({ progressData:data })),
                    catchError(error => of(loadProgressFail(error))))
                ),
    );
});

}