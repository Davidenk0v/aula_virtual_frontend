import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private oAuthService:OAuthService, private router:Router) {
    this.initConfiguration()
    this.handleLogin();
   }

   initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: environment.keycloak.issuer,
      redirectUri: "http://localhost:4200",
      clientId: environment.keycloak.clientId,
      tokenEndpoint: `${environment.keycloak.issuer}/protocol/openid-connect/token`,
      responseType: 'code',
      scope: 'openid profile email',
      showDebugInformation: true
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
   }


   login() {
    this.oAuthService.initCodeFlow();
   }

   logout() {
    this.oAuthService.revokeTokenAndLogout();
   }

   getProfile():User {
    const claims = this.oAuthService.getIdentityClaims();
    return {
      firstName: claims['name'],
      email: claims['email'],
      userName: claims['preferred_username'],
      lastName: claims['family_name'],
      emailVerified: claims['email_verified'],
    };
   }

   getUsername() {
    return this.getProfile().userName;
   }

   getToken() { 
    return this.oAuthService.getAccessToken();
   }


   private handleLogin() {
    this.oAuthService.events.subscribe((event:OAuthEvent) => {
      if(event.type === 'token_received') {
        this.isLoggedInSubject.next(true); 
        this.router.navigateByUrl('/profile');
      }
    });
   }
}
