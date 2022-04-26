

import { IPublicClientApplication, AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { loginRequest } from "../auth/authConfig";



export async function acquireToken(
    authInstance: IPublicClientApplication,
    account: AccountInfo) {

    const tokenRequest = { ...loginRequest, account: account};

    const authRes: AuthenticationResult = await authInstance.acquireTokenSilent(tokenRequest);

    const token = authRes.accessToken;
    //console.log(token);

    return token;
};