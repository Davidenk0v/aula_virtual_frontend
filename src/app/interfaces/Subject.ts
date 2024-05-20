import { Lesson } from "./Lessons"

export interface Subject {
  idSubject: number
  name: string
  description: string
  lessons: Lesson[]
}