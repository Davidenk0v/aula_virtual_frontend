import { Lesson } from "./Lesson"

export interface Subject {
  idSubject: number
  name: string
  description: string
  lessons: Lesson[]
}