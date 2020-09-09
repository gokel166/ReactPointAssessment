import React, { useState, useEffect } from 'react';
import testData from '../../src/data/testData';
import { useTable } from 'react-table';
import DataTable from './DataTable';
import { ReactTable } from 'react-table';

// Calculate Points Function
function calculateDataOutput(dataSet) {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
        let {customerId, customerName, month, points } = ppt;
        if (!byCustomer[customerId]) {
            byCustomer[customerId] = [];
        }

        if (!totalPointsByCustomer[customerId]) {
            totalPointsByCustomer[customerName] = 0;
        }

        totalPointsByCustomer[customerName] += points;

        if (byCustomer[customerId][month]) {
            byCustomer[customerId][month].points += points;
            byCustomer[customerId][month].monthNumber += month;
            byCustomer[customerId][month].numTransactions++;
        }
        else {
            byCustomer[customerId][month] = {
                customerId,
                customerName,
                monthNumber: month,
                month: months[month],
                numTransactions: 1,
                points
            }
        }
    });

    // console.log(byCustomer)

    let tot = [];
    for (let custKey in byCustomer) {
        byCustomer[custKey].forEach(cRow => {
            tot.push(cRow);
        });
    }

    let totByCustomer = [];

    for (let custKey in totalPointsByCustomer) {    
        totByCustomer.push({
            customerName: custKey,
          points: totalPointsByCustomer[custKey]
        });    
      }
    
    return {
        summaryByCustomer: tot,
        ptPerTransaction,
        totalPointsByCustomer: totByCustomer
    }

}

const PointCalc = () => {
    const [transactionData, setTransactionData] = useState([]);

    // Customer receives 2 points / dollar over $100
    let td = testData().then((data) => {
        const results = calculateDataOutput(data);
        // setTransactionData(results);
        
    }, []);

    // console.log("td");
    // console.log(td);

    useEffect(() => {
        testData().then((data) => {
            const results = calculateDataOutput(data);
            setTransactionData(results);
        });
    }, []);


    let tstData = testData().then((data) => {
        return calculateDataOutput(data);
    }, []);

    let arrTransactionData = Object.values(transactionData);
    // console.log(arrTransactionData);

    let newData = arrTransactionData.map((k, i) => {
        return arrTransactionData[i];
    });


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

    const totalsByColumns = [
        {
          Header:'Customer',
          accessor: 'name'      
        },    
        {
          Header:'Points',
          accessor: 'points'
        }
      ];

    // Create tabel instace for markup
    // const tableInstance = useTable({ columns, transactionData });
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
            
            {/* <ReactTable columns={columns}/> */}
        </div>
    );
}

export default PointCalc;