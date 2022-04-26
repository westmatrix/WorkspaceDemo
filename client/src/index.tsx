
import React from 'react';
import ReactDOM from 'react-dom';

import MainContainer from './components/MainContainer';


import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth/authConfig";


const msalInstance: PublicClientApplication = new PublicClientApplication(msalConfig);


//render(<MainContainer />, document.getElementById('main'));

ReactDOM.render(
    <MsalProvider instance={msalInstance}>
        <MainContainer />
    </MsalProvider>,
    document.getElementById("main")
);