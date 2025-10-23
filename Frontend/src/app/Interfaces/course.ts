import { Topic } from "./topic"

export interface Course {
        name:string,
        categoryId: number,
        price: number,
        description: string ,
        duration: number,
        thumbnailSrc: string
      }
export interface CourseUpdate{
  name:string,
  categoryId: number,
  price: number,
  description: string ,
  duration: number,
}
 export interface Courses  {
        courseId: number,
        categoryId: number,
        name: string,
        duration: number,
        description:string,
        thumbnailSrc:string,
        price: number,
        topics: Array<Topic>,
        createdDate:string
        coursestatus:number
        popularity:number
      }
    

    