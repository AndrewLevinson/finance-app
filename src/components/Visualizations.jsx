import Nav from './Nav';
import { useTransactionsStore } from '../store';

function Visualizations() {
  const transactions = useTransactionsStore(state => state.transactions);
  return (
    <div className='my-10 mx-auto w-full max-w-5xl'>
      <Nav />
      <h2 className='text-2xl font-bold mb-3'>Let's visualize</h2>

      <div>make a chart with showing all {transactions?.length} transactions over time</div>
    </div>
  );
}

export default Visualizations;
