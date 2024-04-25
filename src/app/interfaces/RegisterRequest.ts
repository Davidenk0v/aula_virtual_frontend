import { Address } from "./Address";

export interface RegisterRequest {

    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: Address;
    password?: string;
  
  }