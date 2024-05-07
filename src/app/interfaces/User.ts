
export interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified: boolean;


}


export interface UserEdit {
  lastname: string
  firstname: string
  urlImg: string
}