import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';

function Chart({ type }) {
  const data = [   { name: '1월', 수입: 4000, 지출: 2400 },
  { name: '2월', 수입: 3000, 지출: 1398 },
  { name: '3월', 수입: 2000, 지출: 9800 },];

  if (type === 'accountBook') {
    return (
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="수입" fill="#82ca9d" />
        <Bar dataKey="지출" fill="#8884d8" />
      </BarChart>
    );
  } else if (type === 'calendar') {
    // ... 다른 차트 유형 렌더링
  }

}

export default Chart;