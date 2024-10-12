import React, { useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { Client } from '@microsoft/microsoft-graph-client';

function GraphData() {
  const { instance, accounts } = useMsal();
  const [users, setUsers] = useState([]);
  const [licenses, setLicenses] = useState([]);

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

        // Benutzer abrufen
        client.api('/users').get((err, res) => {
          if (err) {
            console.error(err);
          } else {
            setUsers(res.value);
          }
        });

        // Lizenzen abrufen  
        client.api('/subscribedSkus').get((err, res) => {
          if (err) {
            console.error(err);
          } else {
            setLicenses(res.value);  
          }
        });
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [accounts, instance]);

  return (
    <div>
      <h2>Benutzerliste aus MS Graph</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.displayName} ({user.userPrincipalName})
          </li>
        ))}
      </ul>

      <h2>Lizenzen aus MS Graph</h2>  
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Genutzte Einheiten</th>
            <th>Erworbene Einheiten</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((license) => (
            <tr key={license.skuId}>
              <td>{license.skuPartNumber}</td>
              <td>{license.consumedUnits}</td>
              <td>{license.prepaidUnits.enabled}</td>
            </tr>
          ))}  
        </tbody>
      </table>
    </div>
  );
}

export default GraphData;