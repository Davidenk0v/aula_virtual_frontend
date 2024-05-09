export interface JwtKeycloak {
    sub?: string;  // Subject (optional)
    name?: string;
    email?:string;
    preferred_username?:string;
    realm_access: {
        roles:string[]
    }
    resource_access: {
        "virtual-class-room": {
            roles:string[]
        }
    }
  }