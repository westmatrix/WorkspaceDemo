import express from 'express';
import http from 'http';
import path from 'path';

import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';
import { NodesRoutes } from './nodes/nodes.routes.config';
import { TablesRoutes } from './tables/tables.routes.config';


export class App{

    private port: number = 3000;
    private routes: Array<CommonRoutesConfig> = [];

    private expressApp: express.Application;

    constructor() {

        this.expressApp = express();
        
        this.expressApp.use(express.json());
        
        // here we are adding the UserRoutes to our array,
        // after sending the Express.js application object to have the routes added to our app!
        this.routes.push(new UsersRoutes(this.expressApp));
        this.routes.push(new NodesRoutes(this.expressApp));
        this.routes.push(new TablesRoutes(this.expressApp));

        const clientRoot:string = path.resolve("../client/build");
        console.log("Client root path: " + clientRoot);
        this.expressApp.use(express.static(clientRoot));
        
        // Config a debug route
        this.expressApp.get('/debug', (req: express.Request, res: express.Response) => {
        
            let debugInfo = {
                clientRoot: clientRoot
            };

            res.status(200).send(JSON.stringify(debugInfo, null, 4));
        });
    }

    public run() : void {
        
        const server: http.Server = http.createServer(this.expressApp);

        server.listen(this.port, () => {

            console.log(`⚡️[server]: Server is running at http://localhost:${this.port}`);

        });

    }
}
