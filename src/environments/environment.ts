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
    paypal:{
      urlPayPal: "https://api-m.sandbox.paypal.com/v1/",
      clientIdPayPal: "AYc34_BIRYaErn5nChwIVkNqDHmk00fGY026AxAuV51_nylYSkSXQ-nFfA7PIa81HoFIZYP5VG2NtXBv",
      secretKeyPayPal: "EJ90HQsiW5g6D4ep0pYnbjb6euHcYLrEszqMuL0Co0WtF1Wq8Ce0AwMsppPltOwb4oc0v1v6DAQweV1B"
    }
  };