import { createAction, props } from "@ngrx/store";
import { Category } from "../Interfaces/category";

export  const LoadCategory=createAction('LoadCategory');
export const LoadCategorySuccess=createAction('[LoadCategory] Success',props<{data:Array<Category>}>());