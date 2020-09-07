import React, { useState, useEffect } from 'react';
import testData from '../../src/data/testData';
import { useTable } from 'react-table';

// Calculate Points Function
function calculateDataOutput(dataSet) {

    const ptPerTransaction = dataSet.map(transaction => {
        let points = 0;
        let aboveOneHundredPts = transaction.amount - 100;

        if (aboveOneHundredPts > 0) {
            points += (aboveOneHundredPts * 2);
        }
        if (transaction.amount > 50) {
            points += 50;
        }

        // get month / day / date / year
        const month = new Date(transaction.transactionDate).getUTCMonth();
        const day = new Date(transaction.transactionDate).getUTCDay();
        const date = new Date(transaction.transactionDate).getUTCDate();
        // console.log(month);

        return { ...transaction, points, month };
    });

    let byCustomer = {};
    let totalPointsByCustomer = {};

    ptPerTransaction.forEach(ppt => {
        let {customerId, name, month, points } = ppt;
        if(!byCustomer[customerId]) {
            byCustomer[customerId] = [];
        }
    });

    let tot = [];


    let totByCustomer = [];
    
    return {
        summaryByCustomer: tot,
        ptPerTransaction,
        totalPointsByCustomer: totByCustomer
    }

}

const PointCalc = () => {
    const [transactionData, setTransactionData] = useState(null);

    // Customer receives 2 points / dollar over $100
    // let td = testData().then((data) => {
    //     const results = calculateDataOutput(data);
    //     setTransactionData(results);
    // }, []);

    // console.log("td");
    // console.log(td);

    useEffect(() => {
        testData().then((data) => {
            const results = calculateDataOutput(data);
            setTransactionData(results);
        });
    }, []);

    console.log(transactionData);

    // if (transactionData == null) {
    //     return <div>Loading...</div>
    // }

    // Create Columns

    const columns = React.useMemo(() => [
        {
            Header: 'Column1',
            accessor: 'col1'
        }
    ], []);

    // Create tabel instace for markup
    // const tableInstance = useTable({ columns, td });
    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     rows,
    //     prepareRow,
    //   } = tableInstance

    return (
        <div>
            <h2>Here is the Point Calc Result</h2>
            {/* <ReactTable /> */}

            <table>
                <thead>
                    <tr>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PointCalc;