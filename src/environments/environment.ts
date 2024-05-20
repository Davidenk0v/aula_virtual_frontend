export const environment = {
  api: {
    production: false,
    urlHost: 'http://localhost:8085/',
    urlApi: 'http://localhost:8085/api/v1',
  },
  paypal: {
    urlPayPal: "https://api-m.sandbox.paypal.com/v1/",
    clientIdPayPal: "AYc34_BIRYaErn5nChwIVkNqDHmk00fGY026AxAuV51_nylYSkSXQ-nFfA7PIa81HoFIZYP5VG2NtXBv",
    secretKeyPayPal: "EJ90HQsiW5g6D4ep0pYnbjb6euHcYLrEszqMuL0Co0WtF1Wq8Ce0AwMsppPltOwb4oc0v1v6DAQweV1B"
  },
  zoom: {
    urlServerAuth: 'http://localhost:4000',
    urlServer: 'http://localhost:4000/',
    urlServerToken: 'http://localhost:4000/auth/zoom',
    ZOOM_API_KEY:"6p_ZQkgXQ_K8gJe7bxq8Tg",
    ZOOM_API_SECRET:"4CIjAjKcm0xiWD17Q8v5BTiBgI59aRHI",
    REDIRECT_URI:"http://localhost:4200",
    TOKEN:"E4qYva_bTW-xFnqCPYB-8A"
  }
};