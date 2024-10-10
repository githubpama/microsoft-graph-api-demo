import React, { useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { Client } from '@microsoft/microsoft-graph-client';

function GraphData() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      const accessTokenRequest = {
        scopes: ["https://graph.microsoft.com/.default"],
        account: accounts[0]
      };

      instance.acquireTokenSilent(accessTokenRequest).then((accessTokenResponse) => {
        const accessToken = accessTokenResponse.accessToken;

        const client = Client.init({
          authProvider: (done) => {
            done(null, accessToken);
          }
        });

        client.api('/users').get((err, res) => {
          if (err) {
            console.error(err);
          } else {
            setGraphData(res.value);
          }
        });
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [accounts, instance]);

  if (!graphData) {
    return <p>Lade Daten...</p>;
  }

  return (
    <div>
      <h2>Benutzerliste aus MS Graph</h2>
      <ul>
        {graphData.map((user) => (
          <li key={user.id}>
            {user.displayName} ({user.userPrincipalName})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GraphData;