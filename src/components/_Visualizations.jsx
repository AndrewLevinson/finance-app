import { useState, useEffect } from 'react';
import Nav from './Nav';
import { useTransactionsStore } from '../store';
import { Radar } from './RadarChart/Radar';

function Visualizations() {
  const [filteredData, setfilteredData] = useState(null);
  const transactions = useTransactionsStore(state => state.transactions);

  const setSelectedRange = value => {
    if (!value) return;
    if (value == 'all') return transactions;
    const newTrans = transactions.filter(x => {
      return new Date(x.date).getMonth() == value;
    });
    setfilteredData(newTrans);
  };

  console.log(filteredData);

  return (
    <div className='my-10 mx-auto w-full max-w-5xl p-5'>
      <Nav />
      <h2 className='text-2xl font-bold mb-3'>Let's visualize</h2>

      <div>make a chart with showing all {transactions?.length} transactions over time</div>
      <div className='mb-5'>make a chart with showing all transaction categories for a given time period</div>

      <select onChange={e => setSelectedRange(e.target.value)}>
        <option value='all'>All data</option>
        <option value='0'>January</option>
        <option value='1'>February</option>
        <option value='2'>March</option>
      </select>
      {transactions?.length && (
        <Radar
          data={filteredData || transactions}
          width={500}
          height={500}
          axisConfig={[
            { name: 'cc payment', max: 15000 },
            { name: 'rent', max: 15000 },
            { name: 'utilities', max: 15000 },
            { name: 'expense', max: 15000 },
            { name: 'transfer', max: 15000 },
            { name: 'venmo', max: 15000 },
          ]}
        />
      )}
    </div>
  );
}

export default Visualizations;
