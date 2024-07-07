import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface BarChartProps {
  month: string;
}

const CustomBarChart: React.FC<BarChartProps> = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bar-chart', { params: { month } });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-6">
      <div className='font-bold text-center text-2xl mb-4'>
          Bar Chart Stats - {month}
      </div>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default CustomBarChart;
