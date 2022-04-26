import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';

interface NodeData {
    name: string;
    toggled: boolean;
    id: string;
    children: Partial<NodeData>[];
    active: boolean;
    loading: boolean;
};

const NODES : Partial<NodeData> = {
    name: 'root',
    id: '0',
    toggled: true,
    children: [
        {
            name: 'Documents',
            id: '1',
            children: [
                {
                    name: 'Tax Docs',
                    id: '1.1',
                },
                {
                    name: 'Writings',
                    id: '1.2',
                }
            ]
        },
        {
            name: 'loading parent',
            id: '-1',
            loading: true,
            children: []
        },
        {
            name: 'Pictures',
            id: '2',
            children: [
                {
                    name: 'Travel',
                    id: '2.1',
                    children: [
                        { name: 'Mexico', id: "2.1.1" },
                        { name: 'Canada', id: "2.1.2" }
                    ]
                }
            ]
        }
    ]
};

export class NodesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'NodesRoutes');
    }

    configureRoutes() {

        this.app.route(`/nodes`)
            .get((req: express.Request, res: express.Response) => {

                res.status(200).send(NODES);
            });
    
        this.app.route(`/nodes/:nodeId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for id ${req.params.nodeId}`);
            });
    
        return this.app;
    }

}