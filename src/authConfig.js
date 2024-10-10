export const msalConfig = {
    auth: {
      clientId: "61308095-235c-4143-b6f0-cae24c04b3a7",
      authority: "https://login.microsoftonline.com/d73995e9-cb7a-4e16-9990-144f132fc43a",
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    }
  };
  
  export const loginRequest = {
    scopes: ["User.Read"],
  };
  
  export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };