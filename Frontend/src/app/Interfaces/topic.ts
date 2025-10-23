export interface TopicDetaild {
    topicId:number,
    title: string,
    description: string,
    topics: number,
    parentId: number|null,
    courseId?:number
}
export interface subTopic {
  subTopicId:number,
  title: string,
  description: string,
  topics: number,
  parentId: number|null
}

export interface TopicInput{
  title: string,
  description: string,
  topics: number,
  parentId: number|null
  courseId?: number
}

export interface Topic{
  topicId: number,
    title: string,
    description: string,
    subtopics: Array<SubTopic>
  }
  export interface SubTopic {
    subTopicId:number,
    title: string,
    description: string,
    media: []
  }
  export interface Media{
    mediaId: number,
    topicId: number,
    mediaSrc: string,
    mediaType:string
  }