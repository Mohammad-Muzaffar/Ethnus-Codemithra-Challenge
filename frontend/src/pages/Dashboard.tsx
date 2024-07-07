import React, { useState } from 'react';
import TransactionsTable from '../components/TransactionsTable';
import Statistics from '../components/Statistics';
import CustomBarChart from '../components/CustomBarChart';
import CustomPieChart from '../components/CustomPieChart';

const Dashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="dashboard">
      <div className="mb-4 m-9">
        <label htmlFor="month-select" className="block mb-2">Select Month:</label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-2 border rounded"
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div className='m-10'>
          <TransactionsTable month={selectedMonth} />
      </div>
      <div className='my-7'>
        <Statistics month={selectedMonth} />
      </div>
      <div className='grid grid-cols-2 my-7'>
        <div className='flex justify-center'>
             <CustomBarChart month={selectedMonth} />
        </div>
        <div className='flex justify-center pb-9'>
             <CustomPieChart month={selectedMonth} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

