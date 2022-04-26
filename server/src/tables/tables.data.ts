

export interface TableColumn {
    Header?: string;
    accessor?: string;
};

export interface TableRow {
    name?: string;
    type?: string;
    size?: string;
};

//  Must be compatible with TableOptions<{}> of React-table
export interface TableBlob {
    columns: TableColumn[];
    data: TableRow[];
};

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

interface DataMapType {
    [key: string]: TableRow[]
}

const DATA_MAP: DataMapType = {
    "0": [
        {
            name: 'Documents',
            type: '<folder>',
            size: '0'
        },
        {
            name: 'Pictures',
            type: '<folder>',
            size: '0'
        },
        {
            name: 'Untited.txt',
            type: 'text/plain',
            size: '16B'
        },
    ],

    "1": [
        {
            name: 'Tax Docs',
            type: '<folder>',
            size: '0'
        },
        {
            name: 'Writings',
            type: '<folder>',
            size: '0'
        },
        {
            name: 'Refactoring.pdf',
            type: 'application/pdf',
            size: '15M'
        },
        {
            name: "Too Much Code, Let's Talk.pptx",
            type: 'application/pptx',
            size: '20M'
        },
    ],

    "1.1": [
        {
            name: '2020.pdf',
            type: 'application/pdf',
            size: '10M'
        },
        {
            name: '2021.pdf',
            type: 'application/pdf',
            size: '10M'
        },
    ],

    "1.2": [
        {
            name: 'Dear Alice.docx',
            type: 'application/docx',
            size: '826K'
        },
    ],

    "2": [
        {
            name: 'Travel',
            type: '<folder>',
            size: '0'
        },
        {
            name: 'Self.png',
            type: 'image/png',
            size: '256K'
        },
    ],

    "2.1": [
        {
            name: 'Mexico',
            type: '<folder>',
            size: '0'
        },
        {
            name: 'Canada',
            type: '<folder>',
            size: '0'
        }
    ],
};

export function getTableData(tableId: string) : TableBlob {

    const data: TableRow[] = DATA_MAP[tableId] as TableRow[];

    return {
        columns: COLUMNS,
        data: data,
    };
}

