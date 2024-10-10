import React from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import './App.css';
import GraphData from './GraphData';

function ProfileContent() {
  return (
    <div>
      <GraphData />
      <p>Sie sind angemeldet.</p>
    </div>
  );
}

function App() {
  const { instance, accounts, inProgress } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch(e => {
      console.error(e);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React-App mit Microsoft Graph-API</h1>
      </header>

      {accounts.length === 0 ?
        <div>
          <p>Um diese Anwendung zu verwenden, müssen Sie sich anmelden.</p>
          <button onClick={handleLogin} disabled={inProgress === "login"}>Anmelden</button>
        </div>
        :
        <div>
          <ProfileContent />
          <button onClick={handleLogout} disabled={inProgress === "logout"}>Abmelden</button>
        </div>
      }
    </div>
  );
}

export default App;
