
export interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified: boolean;
  idUser: number

}


export interface UserEdit {
  username: string;
  lastname: string
  firstname: string
  urlImg: string
}