import { useState, useEffect, useMemo } from 'react';
import Nav from './Nav';
import balanceSheetData from '../files/net_worth.json';
import { accountLookup, formatter } from '../utils';

function Visualizations() {
  const initialData = balanceSheetData.months;

  const [filteredData, setfilteredData] = useState(initialData);
  // const transactions = useTransactionsStore(state => state.transactions);

  // const setSelectedRange = value => {
  //   if (!value) return;
  //   if (value == 'all') return data;
  //   const newTrans = filteredData.filter(x => {
  //     return new Date(x.date).getMonth() == value;
  //   });
  //   setfilteredData(newTrans);
  // };

  // console.log(balanceSheetData);

  const netWorth = useMemo(() => {
    if (!initialData) return;
    return initialData.map(month => {
      const totalAssets = Object.values(month.amounts).reduce((a, b) => a + (b > 0 ? b : 0), 0);
      const totalDebt = Object.values(month.amounts).reduce((a, b) => a + (b < 0 ? b : 0), 0);
      const monthlyBalance = { totalAssets, totalDebt, netWorth: totalAssets + totalDebt };

      return { ...month, monthlyBalance };
    });
  }, [initialData]);

  console.log(netWorth);

  // calculations
  const currentNetWorth = netWorth[netWorth.length - 1].monthlyBalance.netWorth;
  const priorNetWorth = netWorth[netWorth.length - 2].monthlyBalance.netWorth;
  const differenceRaw = currentNetWorth - priorNetWorth;
  const differencePercent = differenceRaw / priorNetWorth;

  return (
    <div className='my-10 mx-auto w-full max-w-5xl px-5'>
      {/* <Nav /> */}
      <div className='mb-10'>
        <h1 className='text-4xl font-bold mb-0.5'>Let's visualize</h1>
        <h2 className='text-lg text-gray-600'>
          Loaded {filteredData?.length} months of balance sheet data from {balanceSheetData.start} to{' '}
          {balanceSheetData.lastUpdate}
        </h2>
      </div>

      <div className='my-5'>
        <div>
          <h4 className='text-slate-400 font-semibold uppercase text-sm'>Net Worth</h4>
          <div className='flex gap-2 items-baseline'>
            <p className='font-semibold text-xl'>{formatter(currentNetWorth, 'currency')}</p>
            <p className='text-slate-400 italic'>
              {differenceRaw < 0 ? '↓' : '↑'} {formatter(differenceRaw, 'currency')} (
              {formatter(differencePercent, 'percent', 2)}) since last month
            </p>
          </div>
        </div>
      </div>

      {/* <select onChange={e => setSelectedRange(e.target.value)}>
        <option value='all'>All data</option>
        <option value='0'>January</option>
        <option value='1'>February</option>
        <option value='2'>March</option>
      </select> */}
    </div>
  );
}

export default Visualizations;
