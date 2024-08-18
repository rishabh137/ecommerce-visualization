import React from 'react';
import TotalSalesChart from './components/TotalSalesChart';
import NewCustomersChart from './components/NewCustomersChart';

const App = () => {
  return (
    <div>
      <h1>Data Visualization</h1>
      <TotalSalesChart />
      <h1>New Customer</h1>
      <NewCustomersChart />
    </div>
  );
}

export default App;
