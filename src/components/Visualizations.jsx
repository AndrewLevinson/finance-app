import { useState, useEffect, useMemo } from 'react';
import Nav from './Nav';
import balanceSheetData from '../files/net_worth.json';
import { accountLookup, formatter } from '../utils';
import NetWorth from './charts/NetWorth';

const timeLookup = {
  2: 'since last month',
  4: 'since 3 months ago',
  7: 'since 6 months ago',
  13: 'since 1 year ago',
};

function Visualizations() {
  const initialData = balanceSheetData.months;
  const [compareDate, setCompareDate] = useState({ value: 2, name: 'since last month' });

  const netWorth = useMemo(() => {
    if (!initialData) return;
    return initialData.map(month => {
      const totalAssets = Object.values(month.amounts).reduce((a, b) => a + (b > 0 ? b : 0), 0);
      const totalDebt = Object.values(month.amounts).reduce((a, b) => a + (b < 0 ? b : 0), 0);
      const netWorth = totalAssets + totalDebt;
      const monthlyBalance = { totalAssets, totalDebt };

      return { ...month, monthlyBalance, netWorth };
    });
  }, [initialData]);

  // calculations
  const currentNetWorth = netWorth[netWorth.length - 1].netWorth;
  const priorNetWorth = netWorth[netWorth.length - compareDate.value].netWorth;
  const differenceRaw = currentNetWorth - priorNetWorth;
  const differencePercent = differenceRaw / priorNetWorth;
  const comparisons = { currentNetWorth, differenceRaw, differencePercent };

  return (
    <div className='my-10 mx-auto w-full max-w-5xl px-5'>
      {/* <Nav /> */}
      <div className='mb-5'>
        <h1 className='text-4xl font-bold mb-0.5'>Welcome, Andrew</h1>
        <h2 className='text-lg text-gray-500 mb-2'>
          Loaded {initialData?.length} months of balance sheet data from {balanceSheetData.start} to{' '}
          {balanceSheetData.lastUpdate}
        </h2>

        <select
          onChange={e => {
            setCompareDate({ value: e.target.value, name: timeLookup[e.target.value] });
          }}
          className='m-0'
        >
          <option value='2'>Since last month</option>
          <option value='4'>Since 3 months ago</option>
          <option value='7'>Since 6 months ago</option>
          <option value='13'>Since 1 year ago</option>
        </select>
      </div>

      <div className='grid gap-8 grid-cols-2'>
        <div className='col-span-2 shadow-sm border-[0.5px] border-slate-100 dark:border-slate-700 p-4 rounded-sm'>
          <NetWorth data={netWorth} comparisons={comparisons} compareDate={compareDate} />
        </div>
        <div className='shadow-sm border-[0.5px] border-slate-100 dark:border-slate-700 p-4 rounded-sm'>
          <NetWorth data={netWorth} comparisons={comparisons} compareDate={compareDate} />
        </div>
        <div className='shadow-sm border-[0.5px] border-slate-100 dark:border-slate-700 p-4 rounded-sm'>
          <NetWorth data={netWorth} comparisons={comparisons} compareDate={compareDate} />
        </div>
      </div>
    </div>
  );
}

export default Visualizations;
