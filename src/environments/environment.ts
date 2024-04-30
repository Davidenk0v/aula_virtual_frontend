export const environment = {
    production: false,
    apiUrl: '/api',
    keycloak: {
      // Keycloak url
      issuer: 'http://localhost:9090/realms/class-rom-app',
      // Realm
      realm: 'class-rom-app',
      clientId: 'classrom-frontend'
    },
  };