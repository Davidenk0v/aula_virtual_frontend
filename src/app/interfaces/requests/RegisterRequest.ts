import { Address } from "../Address";

export interface RegisterRequest {

    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    address?: Address;
    password?: string;
  }