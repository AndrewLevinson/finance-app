import { useState, useEffect, useMemo } from 'react';
import Nav from './Nav';
import balanceSheetData from '../files/net_worth.json';
import { accountLookup, formatter } from '../utils';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { format } from 'date-fns';

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

  return (
    <div className='my-10 mx-auto w-full max-w-5xl px-5'>
      {/* <Nav /> */}
      <div className='mb-10'>
        <h1 className='text-4xl font-bold mb-0.5'>Dashboard</h1>
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
      <div className='my-5'>
        <h4 className='text-slate-400 font-semibold uppercase text-sm'>Net Worth</h4>
        <div className='flex gap-2 items-baseline'>
          <p className='font-semibold text-2xl'>{formatter(currentNetWorth, 'currency')}</p>
          <p className='text-slate-400 italic'>
            {differenceRaw < 0 ? '↓' : '↑'} {formatter(differenceRaw, 'currency')} (
            {formatter(differencePercent, 'percent', 1)}) {compareDate.name}
          </p>
        </div>
      </div>
      <div>
        <ResponsiveContainer width={'100%'} height={350}>
          <AreaChart data={netWorth} margin={{ top: 10, right: 20, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id='grad' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='teal' stopOpacity={0.6} />
                <stop offset='95%' stopColor='teal' stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke='#000' strokeOpacity={0.1} vertical={false} />
            <XAxis dataKey='date' tickMargin={12} tickFormatter={value => format(value, 'MMM yy')} minTickGap={30} />
            <YAxis
              tickFormatter={value => `${formatter(value / 1000)}k`}
              domain={['dataMin', 'auto']}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <Area
              type={'monotone'}
              dataKey='netWorth'
              stroke='teal'
              strokeWidth={2}
              fill='url(#grad)'
              fillOpacity={0.8}
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Visualizations;
