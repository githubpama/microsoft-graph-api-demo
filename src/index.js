import React from 'react';
import ReactDOM from 'react-dom';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import './index.css';
import App from './App';

const msalConfig = {
  auth: {
    clientId: "61308095-235c-4143-b6f0-cae24c04b3a7",
    authority: "https://login.microsoftonline.com/d73995e9-cb7a-4e16-9990-144f132fc43a",
    redirectUri: "http://localhost:3000",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);