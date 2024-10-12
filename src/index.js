import React from 'react';
import ReactDOM from 'react-dom/client';
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
const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <div style={{flex: '0 0 auto', padding: '10px', backgroundColor: 'black', color: 'white'}}>
        React-App mit Microsoft Graph-API
      </div>
      <div style={{flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{fontSize: '1.5em'}}>
          <MsalProvider instance={msalInstance}>
            <App />
          </MsalProvider>
        </div>
      </div>
    </div>
  </React.StrictMode>
);