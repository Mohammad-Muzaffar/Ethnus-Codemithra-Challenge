import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface StatisticsProps {
  month: string;
}

const Statistics: React.FC<StatisticsProps> = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSalesAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/statistics', {
        params: { month },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <div className='font-bold text-center text-2xl mb-4'>
            Statistics - {month}
        </div>

        <div className="flex flex-wrap justify-around mt-6">

        <div className="bg-white shadow-lg rounded-lg p-6 m-2 w-full sm:w-1/3 lg:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Total Sale Amount</h2>
            <p className="text-2xl text-green-500">${statistics.totalSalesAmount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 m-2 w-full sm:w-1/3 lg:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Sold Items</h2>
            <p className="text-2xl text-blue-500">{statistics.totalSoldItems}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 m-2 w-full sm:w-1/3 lg:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Not Sold Items</h2>
            <p className="text-2xl text-red-500">{statistics.totalNotSoldItems}</p>
        </div>
        </div>
    </div>
  );
};

export default Statistics;
