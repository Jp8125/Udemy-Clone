import { Injectable } from "@angular/core";
import { CourseService } from "../user/Services/course.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AddCourses, AddCoursesuccess, EditCourse, EditCourseSuccess, EditSubtopic, LoadCourses, LoadCoursesuccess, deleteControl, deleteCourse } from "./course.actions";
import { map, mergeMap } from "rxjs";
import { AdminService } from "../Admin/Services/admin.service";

@Injectable()
export class CourseEffect {
    constructor(private action$: Actions, private courseService: CourseService,private admin:AdminService) { }
    GetCourses$ = createEffect(() => {
        return this.action$.pipe(
            ofType(LoadCourses),
            mergeMap(() =>
                this.courseService.GetCourses().pipe(
                    map((res) => LoadCoursesuccess({ Courses: res }))
                )
            )
        );
    });
    addCourses$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AddCourses),
            mergeMap((value) =>
                this.admin.addCourse(value.Course).pipe(
                    map((res) => AddCoursesuccess({ Course:res }))
                )
            )
        );
    });
    deleteCourses$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deleteControl),
            mergeMap((value) =>
                this.admin.deleteCourse(value.id).pipe(
                    map((res) => deleteCourse({ id: res.id }))
                )
            )
        );
    });
    UpdatedCourse = createEffect(() => {
        return this.action$.pipe(
          ofType(EditCourse),
          mergeMap((value) =>
            this.admin
              .updateCourse(value.id,value.data)
              .pipe(map((res) => EditCourseSuccess({ data: res, id: res.courseId })))
          )
        );
      });
    UpdatedTopic = createEffect(() => {
        return this.action$.pipe(
          ofType(EditSubtopic),
          mergeMap((value) =>
            this.admin
              .updateSubtopic(value.id,value.courseId,value.data)
              .pipe(map((res) => EditCourseSuccess({ data: res, id: res.courseId })))
          )
        );
      });
}

