
import React, { useState, useEffect, useMemo } from 'react';


import { TableOptions, useTable } from 'react-table'

//import 'bootstrap/dist/css/bootstrap.min.css';

import BTable from 'react-bootstrap/Table';

import { NodeData } from './TreePane';

interface TableColumn {
    Header: string;
    accessor: string;
};


interface TableBlob {
    columns?: TableColumn[];
    data?: NodeData[];
};

interface TableViewProps {
    node: Partial<NodeData> | undefined;
}


const COLUMNS = [  // Must be named "columns" 
    {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
    },
    {
        Header: 'Type',
        accessor: 'type',
    },
    {
        Header: 'Size',
        accessor: 'size',
    },
];

export default function TableView(tableViewProps: TableViewProps): JSX.Element {
    
    const INIT_DATA: TableBlob = {
        columns: [],
        data: []
    };

    const [tableData, setTableData] = useState<TableBlob>(INIT_DATA);
    
    useEffect(() => {

        /*
        async function fetchData() {
            const response = await fetch("/tables/" + tableViewProps.currentTable);
            const jsonObj = await response.json();
            setTableData(jsonObj);
        }
        fetchData();
        */

        if (tableViewProps.node) {
            setTableData({ columns: COLUMNS, data: tableViewProps.node.children});
        }

    }, [tableViewProps.node]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(tableData as TableOptions<{}>);
      
    // Render the UI for your table
    return (
        <BTable striped bordered hover size="sm" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody>
                {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
                        <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
                )
                })}
            </tbody>
        </BTable>
    )
};