import { User } from "./User";

export interface CommentI {
  idComment?:number;
  text: string;
  date: string;
  userId: string;
  username?:string;
}
