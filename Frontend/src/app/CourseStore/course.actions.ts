import { createAction, props } from "@ngrx/store";
import { Course, CourseUpdate, Courses } from "../Interfaces/course";
import { TopicInput } from "../Interfaces/topic";


export const LoadCourses=createAction('[Load] Courses');
export const LoadCoursesuccess=createAction('Courses',props<{Courses:Array<Courses>}>());

export const AddCourses=createAction('[Add] Courses',props<{Course:Course}>());
export const AddCoursesuccess=createAction('[Add] Courses Success',props<{Course:Courses}>());

export const deleteControl=createAction('[delete] confirm',props<{id:number}>())
export const deleteCourse=createAction('[delete] Course',props<{id:number}>())

export const EditCourse=createAction('EditTopic',props<{data:CourseUpdate,id:number}>());
export const EditCourseSuccess=createAction('EditTopic Success',props<{data:Courses,id:number}>());

export const EditSubtopic=createAction('EditSubTopic',props<{data:TopicInput,id:number,courseId:number}>());
export const EditSubTopicSuccess=createAction('EditSubTopic Success',props<{data:Courses,id:number}>());