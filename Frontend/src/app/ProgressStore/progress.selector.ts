import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProgressState } from "../Interfaces/progress-state";

export const selectFeatureProgress=createFeatureSelector<ProgressState>('progress')
export const selectProgress= createSelector(
    selectFeatureProgress,
    (state: ProgressState) => state.progress
);