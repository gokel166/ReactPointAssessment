import React from 'react';

const PointCalc = () => {
    // Customer receives 2 points / dollar over $100
    let dollars = 0;
    let points;

    function TwoPointAccumilator(dlr) {
        let totalDollars = dlr + dollars;
        let totalPoints;

        if (totalDollars > 100) {
            return totalPoints % 2
        }
        else {
            return totalPoints;
        }
        
    }

    function primaryLinearGrowth(num) {
        return (51/2)*(num);
    }

    console.log(primaryLinearGrowth(100));

    console.log(TwoPointAccumilator(100));
    console.log(OnePointAccumilator(100))

    // Customer receives 1 points / dollar over $50
    function OnePointAccumilator(dlr) {}

    return (
        <div>
            <h2>Here is the Point Calc Result</h2>
        </div>
    );
}

export default PointCalc;