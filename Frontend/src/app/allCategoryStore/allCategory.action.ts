import { createAction, props } from "@ngrx/store";
import { Category } from "../Interfaces/category";

export  const Loadwithoutsub=createAction('Loadwithoutsub');
export const LoadwithoutsubSuccess=createAction('[Loadwithoutsub] Success',props<{data:Array<Category>}>());