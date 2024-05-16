import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtKeycloak } from '../../interfaces/JwtKeycloak';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  token?:string;

  getNameFromToken():any{
      this.token = sessionStorage.getItem('token') ?? '';
      if(this.token != ''){
        const {name} = jwtDecode(this.token) as JwtKeycloak;
        return name;
      }
  }

  getRoleFromToken():any{
    this.token = sessionStorage.getItem('token') ?? '';
    if(this.token != ''){
    const {realm_access} = jwtDecode(this.token) as JwtKeycloak;
    return realm_access.roles;
    }
}

getEmailFromToken():any{
  this.token = sessionStorage.getItem('token') ?? '';
  if(this.token != ''){
  const {email} = jwtDecode(this.token) as JwtKeycloak;
  return email;
  }
}

getUsernameFromToken():any{
  this.token = sessionStorage.getItem('token') ?? '';
  if(this.token != ''){
  const {preferred_username} = jwtDecode(this.token) as JwtKeycloak;
  return preferred_username;
  }
}

getIdFromToken():any{
  this.token = sessionStorage.getItem('token') ?? '';
  if(this.token != ''){
  const {sub} = jwtDecode(this.token) as JwtKeycloak;
  return sub;
  }
}

}
