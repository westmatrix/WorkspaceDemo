



export async function getChildren(accessToken: string, id: string) {

    let segment: string = `items/${id}`;

    if (id === "root") {
        segment = "root";
    }

    const graphEndpoind: string = `https://graph.microsoft.com/v1.0/me/drive/${segment}/children`;

    console.log(graphEndpoind);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    const response: Response = await fetch(graphEndpoind, options);
    return await response.json();
};



export async function getRootItems(accessToken: string) {

    const GRAPH_ENDPOINT: string = "https://graph.microsoft.com/v1.0/me/drive/root/children";

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    const response: Response = await fetch(GRAPH_ENDPOINT, options);
    return await response.json();
};