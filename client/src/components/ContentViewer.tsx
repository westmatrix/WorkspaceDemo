
import React, { useState, useEffect } from 'react';

import styled from 'styled-components'

import TableView from './TableView'

import { NodeData } from './TreePane';

interface ContentViewerProps {
    node: Partial<NodeData> | undefined;
}

export default function ContentViewer(contentVieweProps: ContentViewerProps): JSX.Element {
    
    const [content, setContent] = useState<string>("Initializing...");

    useEffect(() => {
        document.title = `Workspace Explorer`;
    }, [content]);
    
    return (
        <div>
            <TableView node={contentVieweProps.node}/>
        </div>
    );
    
}