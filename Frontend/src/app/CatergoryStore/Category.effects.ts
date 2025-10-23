import { Injectable } from '@angular/core';
import { CourseService } from '../user/Services/course.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadCategory, LoadCategorySuccess } from './Category.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class CategoryEffects {
    constructor(
        private CategoryService: CourseService,
        private actions: Actions
    ) { }
    effectName$ = createEffect(() => {
        return this.actions.pipe(
            ofType(LoadCategory),
            mergeMap(() =>
                this.CategoryService.GetCategories().pipe(
                    map((data) => LoadCategorySuccess({ data }))
                )
            )
        );
    });
}
