import React, { Component } from 'react';
import { stockData } from '../../src/data/secondTestData';
import DataTable from './DataTable';

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
    let cal = calculateDataOutput(stockData);
    // console.log(cal);
    let dataArr = Object.keys(cal).map((k, i) => {
        // console.log(cal[k])
        return cal[k];
    });

    let customerNames = [];
    console.log(customerNames);
    let summary = cal.summaryByCustomer;
    let testObj = Object.values(summary).map((k, i) => {
        customerNames.push(k);
        return [k]
    });
    // console.log(customerNames);

    var res = customerNames.filter(c => c.customerName != 'Mike')
    console.log(res);

    // console.log(testObj);


    // console.log(typeof dataArr)

    // <DataTable data={search(stockData)}/>
    return (
        <div>
            {customerNames.map((k, i) => {
                return (
                    <div key={i}>
                            <tbody>
                                <tr>
                                    <td>{k.customerId}</td>
                                    <td>{k.customerName}</td>
                                    <td>{k.month}</td>
                                    <td>{k.numTransactions}</td>
                                </tr>
                            </tbody>

                    </div>
                )
            })}
        </div>
    );
}

export default TestComp;

