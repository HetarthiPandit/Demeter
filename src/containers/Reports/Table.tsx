import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

interface DataType {
    id: number;
    Date: string;
    Deposits: number;
    'Opening balance': number;
    'Profit/Loss': number;
    'Closing balance': number;
    Withdrawal: number;
    'Monthly returns': number;
}

interface TableParams {
    pagination: {
        current: number;
        pageSize: number;
        total?: number;
    };
    sortField?: string;
    sortOrder?: 'ascend' | 'descend' | undefined;
    filters?: Record<string, any>;
}

const columns = [
    {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date',
        sorter: (a: DataType, b: DataType) => new Date(a.Date).getTime() - new Date(b.Date).getTime(),
        render: (text: string) => <span>{text}</span>,
    },
    {
        title: 'Deposits',
        dataIndex: 'Deposits',
        key: 'Deposits',
        sorter: (a: DataType, b: DataType) => a.Deposits - b.Deposits,
        render: (text: number) => <span>{`$${text}`}</span>,
    },
    {
        title: 'Opening balance',
        dataIndex: 'Opening balance',
        key: 'Opening balance',
        sorter: (a: DataType, b: DataType) => a['Opening balance'] - b['Opening balance'],
        render: (text: number) => <span>{`$${text}`}</span>,
    },
    {
        title: 'Profit/Loss',
        dataIndex: 'Profit/Loss',
        key: 'Profit/Loss',
        sorter: (a: DataType, b: DataType) => a['Profit/Loss'] - b['Profit/Loss'],
        render: (text: number) => <span>{`$${text}`}</span>,
    },
    {
        title: 'Closing balance',
        dataIndex: 'Closing balance',
        key: 'Closing balance',
        sorter: (a: DataType, b: DataType) => a['Closing balance'] - b['Closing balance'],
        render: (text: number) => <span>{`$${text}`}</span>,
    },
    {
        title: 'Withdrawal',
        dataIndex: 'Withdrawal',
        key: 'Withdrawal',
        sorter: (a: DataType, b: DataType) => a.Withdrawal - b.Withdrawal,
        render: (text: number) => <span>{`$${text}`}</span>,
    },
    {
        title: 'Monthly returns',
        dataIndex: 'Monthly returns',
        key: 'Monthly returns',
        sorter: (a: DataType, b: DataType) => a['Monthly returns'] - b['Monthly returns'],
        render: (text: number) => <span>{`${text}%`}</span>,
    },
];


const App: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    useEffect(() => {
        fetchData();
    }, [
        tableParams.pagination.current,
        tableParams.pagination.pageSize,
        tableParams.sortOrder,
        tableParams.sortField,
        JSON.stringify(tableParams.filters),
    ]);

    const fetchData = () => {
        setLoading(true);

        // Replace with your actual data fetching logic (e.g., API call)
        const staticData = [
            {
                id: 1,
                Date: '01/06/2024',
                Deposits: 1000,
                'Opening balance': 5000,
                'Profit/Loss': 200,
                'Closing balance': 5200,
                Withdrawal: 0,
                'Monthly returns': 2,
            },
            {
                id: 2,
                Date: '02/06/2024',
                Deposits: 1200,
                'Opening balance': 5200,
                'Profit/Loss': 100,
                'Closing balance': 5100,
                Withdrawal: 0,
                'Monthly returns': -1,
            },
            {
                id: 3,
                Date: '03/06/2024',
                Deposits: 1200,
                'Opening balance': 5200,
                'Profit/Loss': 900,
                'Closing balance': 5100,
                Withdrawal: 0,
                'Monthly returns': -1,
            },
            {
                id: 4,
                Date: '02/06/2024',
                Deposits: 1200,
                'Opening balance': 5200,
                'Profit/Loss': -800,
                'Closing balance': 5100,
                Withdrawal: 0,
                'Monthly returns': -1,
            },
        ];

        setData(staticData);
        setLoading(false);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: staticData.length,
            },
        });
    };

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: sorter.order,
            sortField: sorter.field,
        });

        if (pagination.pageSize !== tableParams.pagination.pageSize) {
            setData([]);
        }
    };

    return (
        <Table
            columns={columns}
            rowKey={(record) => record.id.toString()}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            size="large"
            scroll={{ x: 0 }}
        />
    );
};

export default App;
