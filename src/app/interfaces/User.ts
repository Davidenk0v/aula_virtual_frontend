
export interface User {
  username: string;
  firstName: string;
  lastName: string;
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