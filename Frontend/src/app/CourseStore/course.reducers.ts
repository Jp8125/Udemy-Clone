import { createReducer, on } from "@ngrx/store";
import { CourseState } from "../Interfaces/CourseState.model";
import { AddCoursesuccess, EditCourseSuccess, LoadCoursesuccess, deleteCourse } from "./course.actions";

export const initialState:CourseState={
    Courses:[]
}
export const CourseReducer = createReducer(
    initialState,
    on(LoadCoursesuccess, (state,{Courses}) => ({ ...state, Courses:Courses})),
    on(deleteCourse,(state,{id})=>({...state,Courses:state.Courses.filter(course=>course.courseId!=id)})),
    on(EditCourseSuccess,(state,{data,id})=>({...state,Courses:state.Courses.map(obj=>obj.courseId==id?{...data}:obj)})),
    on(AddCoursesuccess, (state,{Course}) => ({ ...state, Courses:[...state.Courses,Course] })),
);
