import Nav from './Nav';
import { useTransactionsStore } from '../store';
import { Radar } from './RadarChart/Radar';

function Visualizations() {
  const transactions = useTransactionsStore(state => state.transactions);
  return (
    <div className='my-10 mx-auto w-full max-w-5xl'>
      <Nav />
      <h2 className='text-2xl font-bold mb-3'>Let's visualize</h2>

      <div>make a chart with showing all {transactions?.length} transactions over time</div>
      <div>make a chart with showing all transaction categories for a given time period</div>

      <select>
        <option>All data</option>
        <option>January</option>
        <option>February</option>
        <option>March</option>
      </select>
      {transactions?.length && (
        <Radar
          data={transactions}
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
