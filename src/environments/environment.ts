export const environment = {
  api:{
    production: false,
    urlHost: 'http://localhost:8085/',
    urlApi: 'http://localhost:8085/api/v1',
  },
    keycloak: {
      // Keycloak url
      issuer: 'http://localhost:9090/realms/class-rom-app',
      // Realm
      realm: 'class-rom-app',
      clientId: 'classrom-frontend'
    },
  };