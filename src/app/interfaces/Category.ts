import { Course } from "./Course";

export interface Category {
    id?:number;
    category: string;
    courses:Course[]
}