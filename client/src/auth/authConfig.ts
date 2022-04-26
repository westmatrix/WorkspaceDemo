
import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: "9ae59c06-6684-4571-8f99-22c14526526f",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000/",
        postLogoutRedirectUri: "http://localhost:3000/"
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: ["email", "profile", "User.Read", "Files.Read", "Files.Read.All"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/beta/me"
};