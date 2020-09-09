import React, { useState, useEffect } from 'react';
import { stockData } from '../../src/data/secondTestData';
import DataTable from './DataTable';
import testData from '../data/testData';
import ReactTable from 'react-table';
import _ from 'lodash';
import "./css/transactionCalc.css";

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
        let { customerId, customerName, month, points } = ppt;
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

function search(rows) {
    return rows.filter((row) => row.customerName.toLowerCase());
}

const TestComp = () => {
    const [transactionData, setTransactionData] = useState([]);

    const columns = [
        {
            Header: 'Customer',
            accessor: 'name'
        },
        {
            Header: 'Month',
            accessor: 'month'
        },
        {
            Header: "# of Transactions",
            accessor: 'numTransactions'
        },
        {
            Header: 'Reward Points',
            accessor: 'points'
        }
    ];

    const totalsByColumns = [
        {
            Header: 'Customer',
            accessor: 'name'
        },
        {
            Header: 'Points',
            accessor: 'points'
        }];

    function getIndividualTransactions(row) {
        let byCustMonth = _.filter(transactionData.pointsPerTransaction, (tRow) => {
            return row.original.custid === tRow.custid && row.original.monthNumber === tRow.month;
        });
        return byCustMonth;
    }



    useEffect(() => {
        testData().then((data) => {
            const results = calculateDataOutput(data);
            setTransactionData(results);
        });
    }, []);

    // if (transactionData == null) {
    //     return <div>Loading...</div>;
    // }

    // return transactionData == null ?
    //     <div>Loading...</div>
    //     :
    //     <div></div>

    let customerNames = [];

    let tranData = Object.values(transactionData).map((k, i) => {
        customerNames.push(k);
        return [transactionData];
    });

    console.log("++++++++================")
    // console.log(tranData)
    // console.log(customerNames.map((k, i) => k[i]));
    console.log(Object.values(transactionData).map((k, i) => transactionData.ptPerTransaction[i].customerName))

    return (
        <div>
            <ReactTable data={transactionData.summaryByCustomer}
                defaultPageSize={7}
                columns={columns}
                SubComponent={row => {
                    return (
                        <div>
                            {getIndividualTransactions(row).map(t => {
                                return <div className="container">
                                    <div className="row">
                                        <div className="col-5">
                                            <strong>Transaction Date:</strong> {t.transactionDate} = <strong>{t.amount}</strong>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    )
                }} />
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <h2>Points Rewards System Totals By Customer</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <ReactTable
                            data={transactionData.totalPointsByCustomer}
                            columns={totalsByColumns}
                            defaultPageSize={5}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default TestComp;

