import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs";
import { CourseService } from "../user/Services/course.service";
import { Loadwithoutsub, LoadwithoutsubSuccess } from "./allCategory.action";

@Injectable()
export class CourseCategoryEffects {
    constructor(
        private CategoryService: CourseService,
        private actions: Actions
    ) { }
    Categories$ = createEffect(() => {
        return this.actions.pipe(
            ofType(Loadwithoutsub),
            mergeMap(() =>
                this.CategoryService.GetAllCategories().pipe(
                    map((data) => LoadwithoutsubSuccess({ data }))
                )
            )
        );
    });
}
