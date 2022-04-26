
import express from 'express';

import { CommonRoutesConfig } from '../common/common.routes.config';

import { getTableData } from './tables.data';


export class TablesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'TablesRoutes');
    }

    configureRoutes() {

        this.app.route(`/tables`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for all tables.}`);
            });
    
        this.app.route(`/tables/:tableId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: express.Request, res: express.Response) => {

                const tableId = req.params.tableId;
                console.log(`GET requested for id ${tableId}`);

                res.status(200).send(getTableData(tableId));
            });
    
        return this.app;
    }

}