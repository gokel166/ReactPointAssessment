export default function calcOutput(dataSet) {

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

    // console.log(ptPerTransaction);

}