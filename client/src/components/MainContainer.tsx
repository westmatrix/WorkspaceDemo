

import React, { useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


import { IPublicClientApplication, AccountInfo } from "@azure/msal-browser";
import { useMsal, IMsalContext } from "@azure/msal-react";

import { loginRequest } from "../auth/authConfig";

import { PaneContainer } from './PaneContainer';

import { acquireToken } from '../auth/authClient';


export default function MainContainer(): JSX.Element {

    const msalContext: IMsalContext = useMsal();

    const authInstance: IPublicClientApplication = msalContext.instance;
    const account: AccountInfo = msalContext.accounts && msalContext.accounts[0];
    const [authToken, setAuthToken] = useState<string>('');

    useEffect(() => {
        if (account) {
            console.log(account);

            acquireToken(authInstance, account).then((token: string) => {
                // Sub components will rerender
                //console.log(token);
                setAuthToken(token);
            });
        }
    }, [account]);

    const onLogin = () => {

        if (account) {
            // logout
            authInstance.logoutRedirect(loginRequest).catch(e => { console.error(e); });
        }
        else {
            // login
            authInstance.loginRedirect(loginRequest).catch(e => { console.error(e); });
        }

    };

    const getLoginTitle = (): string => {
        if (account) {
            return account.name!;
        }
        else {
            return "Login";
        }
    };


    const doMagic = () => {


    };
    
    return (
        <div>
        <Navbar bg="light" variant="light">
            <Container fluid>
                <Navbar.Brand href="#home">Workspace Explorer</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="#docs">Docs</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link onClick={onLogin}>{getLoginTitle()}</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        
        <div>
            <PaneContainer authToken={authToken} />
        </div>

        <Navbar bg="light" variant="light" fixed="bottom">
            <Container fluid>
                <Nav className="me-auto">
                    <Button variant="link" onClick={doMagic}>Magic!</Button>
                </Nav>
            </Container>
        </Navbar>

        </div>
    );
}
