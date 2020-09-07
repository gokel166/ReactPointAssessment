import React, { useState } from 'react';
import testData from '../../src/data/testData';

// Calculate Points Function
function CalculateDataOutput(dataSet) {

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

    console.log(ptPerTransaction);

}

const PointCalc = () => {
    const [transactionData, setTransactionData] = useState(null);

    // Customer receives 2 points / dollar over $100
    var td = testData().then((data) => {
        const results = CalculateDataOutput(data);
    });
    console.log(td);

    return (
        <div>
            <h2>Here is the Point Calc Result</h2>
        </div>
    );
}

export default PointCalc;