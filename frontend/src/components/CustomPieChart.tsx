import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

interface PieChartProps {
  month: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart: React.FC<PieChartProps> = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pie-chart', { params: { month } });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-0">
        <div className='font-bold text-center text-2xl mb-4'>
          Pie Chart Stats - {month}
      </div>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;
