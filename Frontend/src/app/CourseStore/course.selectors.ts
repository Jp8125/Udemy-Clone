import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from '../Interfaces/CourseState.model';
import { Media } from '../Interfaces/topic';

export const CourseSelector = createFeatureSelector<CourseState>('course');
export const selectallCourse = createSelector(
  CourseSelector,
  (state: CourseState) => state.Courses
);
export const getSingleCourse = (name: string) => createSelector(
    CourseSelector,
    (state) => state.Courses.find(c => c.name == name)
  );
export const getBycategory = (categoryId:number)=> createSelector(
  CourseSelector,
  (state)=>state.Courses.filter(c=>c.categoryId==categoryId)
)
export const getTopics=(name:string,topicname:string)=>createSelector(
  CourseSelector,
  (state)=>state.Courses.find(obj=>obj.name==name)?.topics.find(topic=>topic.title==topicname)
)
export const getId=(name:string)=>createSelector(
  CourseSelector,
  (state)=>state.Courses.find(obj=>obj.name==name)?.courseId
)
export const getNumbers=createSelector(CourseSelector,
  (state)=>state.Courses.length)
  export const Mediaresource=(name: string)=>createSelector(CourseSelector,(state)=>{
    let media:Array<Media>=[]
    state.Courses.forEach(obj=>{
      if(obj.name==name){
        obj.topics.forEach(topic=>{
          topic.subtopics.forEach(subtopic=>{
            media.push(...subtopic.media)
          })
        })
      }
    })
    return media; 
  })