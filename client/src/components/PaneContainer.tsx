
import React, { useState } from 'react';
import ReactDOM from "react-dom";

import Split from 'react-split';

// Import the style
import './split.css';


import TreePane from './TreePane';
import { NodeData } from './TreePane';
import ContentViewer from './ContentViewer';


interface PaneContainerProps {
    authToken?: string;
}

export const PaneContainer = (paneContainerProps: PaneContainerProps): JSX.Element => {
//export default function PaneContainer(paneContainerProps: PaneContainerProps): JSX.Element {

    const [node, setNode] = useState<Partial<NodeData> | undefined>(undefined);

    const nodeSelected = (node: Partial<NodeData>) => {
        console.log(`Selected node with ${node}`);
        setNode(node);
    };

    return (
        <Split 
            style={{ display: "flex", height: "calc(100vh - 64px)", backgroundColor: "red" }}
            sizes={ [25, 75] }
            direction="horizontal"
            cursor="col-resize"
            gutterSize={3}
            className="split-flex" >
            <TreePane authToken={paneContainerProps.authToken}  onSelect={nodeSelected}/>
            <ContentViewer node={node}/>
        </Split>
    )
}