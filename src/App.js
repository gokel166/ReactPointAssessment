import React, { Component } from 'react';
import './App.css';
import PointCalc from './components/PointCalculator';
import TestComp from './components/TransactionCalculator';

function App() {
  return (
    <div className="App">
      <h2>The React Test Application</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>Month</th>
            <th>Number Of Transactions</th>
            <th>Points</th>
          </tr>
        </thead>
        <TestComp />
      </table>
      
    </div>
  );
}

export default App;
