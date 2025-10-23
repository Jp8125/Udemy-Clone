import { createAction, props } from "@ngrx/store";
import { ProgressModel } from "../Interfaces/progress.model";
import { ProgressInputModel } from "../Interfaces/progress-input.model";

export const loadProgress= createAction('[progress] Load',props<{uid:number,cid:number}>());
export const loadProgressSuccess=createAction('[Progress] Load Success',props<{progress:Array<ProgressModel>}>())
export const loadProgressFail=createAction('[progress Load] fail',props<{error:string}>())
export const UpdateProgress=createAction('[Progress Update]',props<{data:ProgressInputModel}>())
export const UpdateSuccess=createAction('[Progress Update] Success',props<{progressData:ProgressModel}>())
