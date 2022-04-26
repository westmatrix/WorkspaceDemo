
import React, { useState, useEffect } from 'react';

// @ts-ignore
import { Treebeard } from 'react-treebeard';

import { getChildren } from '../graph/graphClient'


const treeStyle = {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: '#F0F0F0',
            margin: 0,
            padding: 0,
            fontSize: '1rem'
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                background: 'rgba(0, 0, 0, 0.04)'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                    width: '24px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 14,
                width: 14,
                arrow: {
                    fill: 'rgb(35,31,32)',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: 'rgb(35,31,32)'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};


export interface NodeData {
    name: string;
    id: string;
    size: number;
    type: string;
    createdAt: Date;

    children: NodeData[];
    toggled: boolean;
    active: boolean;
    loading: boolean;
};

interface DataPair {
    treeData?: Partial<NodeData>;
    tableData?: Partial<NodeData>;
}

interface TreePaneProps {
    authToken?: string;
    onSelect: (node: Partial<NodeData>) => void;
}

async function fetechData(
    authToken: string,
    name: string,
    id: string): Promise<DataPair>{
    
    let treeData: Partial<NodeData> = {};

    treeData.name = name;
    treeData.children = [];
    treeData.toggled = true;

    let tableData: Partial<NodeData> = {};
    tableData.name = name;
    tableData.children = [];

    let results: any = await getChildren(authToken, id);
    
    for (let i = 0; i < results.value.length; i++) {
        
        let raw = results.value[i];

        let entry = {
            id: raw.id,
            name: raw.name,
            size: raw.size,
            type: "file",
            createdAt: new Date(raw.createdDateTime),
        };

        if (raw.folder) {
            entry.type = "folder";

            Object.assign(entry, { ...entry, children: [] });

            treeData.children.push(entry as NodeData);
        }

        // Always add to table data
        tableData.children.push(entry as NodeData);
    }

    return { treeData, tableData };
}


export default function TreePane(treeProps: TreePaneProps): JSX.Element {

    const initNode: DataPair = { treeData: { }, tableData: { } };
    
    const [dataPair, setDataPair] = useState<DataPair>(initNode);
    const [cursor, setCursor] = useState<Partial<NodeData>>();
    
    useEffect(() => {
        /*
        async function fetchData() {
            const response = await fetch("/nodes");
            const json = await response.json();
            const responseObj: Partial<NodeData> = json as Partial<NodeData>;
            setData(responseObj);
        }
        fetchData();
        */
        
        if (treeProps.authToken) {

            let nodeId: string = 'root';
            let nodeName: string = 'OneDrive';

            if (cursor) {
                // Not root
                nodeId = cursor.id!;
                nodeName = cursor.name!;
            }

            fetechData(treeProps.authToken, nodeName, nodeId).then((data: DataPair) => {
                if (cursor) {
                    cursor.children = data.treeData!.children;
                    
                    setDataPair(dataPair);
                }
                else {
                    // Directly set table data
                    setDataPair(data);
                }
 
            }).catch ((e) => {
                console.log(e);
            });
        }

    }, [treeProps.authToken, cursor, cursor?.active, cursor?.toggled]);


    const onToggle = (node: Partial<NodeData>, toggled: boolean) => {

        if (cursor) {
            cursor.active = false;
        }
        
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        setCursor(node);

        //setTableData(Object.assign({}, tableData))
        setDataPair(dataPair);

        treeProps.onSelect(node);

        //document.title = `Workspace Explorer: ${node.name}`;
        document.title = node.name ?? '';
    }

    return (
        <Treebeard
            style={treeStyle}
            data={dataPair.treeData}
            onToggle={onToggle}
        />
    )
}